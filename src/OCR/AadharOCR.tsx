import React, { useState } from 'react';
import Tesseract, { OEM, PSM } from 'tesseract.js';
import cv from 'opencv.js';

interface OCRResult {
  name: string;
  dob: string;
  aadhar: string;
}

const AadharOCR: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);

  const [preprocessedImage, setPreprocessedImage] = useState<string | null>(
    null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const preprocessImage = (src: HTMLImageElement): cv.Mat => {
    const mat = cv.imread(src);
    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
    cv.medianBlur(mat, mat, 3);
    cv.threshold(mat, mat, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    const kernel = cv.Mat.ones(1, 1, cv.CV_8U);
    cv.dilate(mat, mat, kernel, new cv.Point(-1, -1), 1);
    cv.erode(mat, mat, kernel, new cv.Point(-1, -1), 1);
    cv.warpAffine(
      mat,
      mat,
      cv.getRotationMatrix2D(new cv.Point(mat.cols / 2, mat.rows / 2), 0, 1),
      mat.size(),
      cv.INTER_CUBIC,
      cv.BORDER_REPLICATE
    );
    return mat;
  };

  const extractData = (text: string): OCRResult => {
    // Regex to match the date of birth (DOB) in the format DD/MM/YYYY
    const dobRegex = /(?:DOB\s*:\s*)?(\d{2}\/\d{2}\/\d{4})/i;

    // Regex to match the Aadhar number (allowing for spaces or dashes between digits)
    const aadharRegex = /\b(\d{4}\s?\d{4}\s?\d{4})\b|\b(\d{4}-\d{4}-\d{4})\b/;

    // Extract matches
    const dobMatch = text.match(dobRegex);
    const aadharMatch = text.match(aadharRegex);

    let name = 'Not found';

    if (dobMatch) {
      const dobIndex = text.indexOf(dobMatch[0]);
      const textBeforeDOB = text.substring(0, dobIndex).trim();

      // Split the text before DOB into lines
      const lines = textBeforeDOB.split(/\n/).map((line) => line.trim());

      // Find the last line that doesn't contain a colon, "Father's name", or is entirely non-alphabetic/empty
      for (let i = lines.length - 1; i >= 0; i--) {
        if (
          !lines[i].includes(':') &&
          !lines[i].toLowerCase().includes("father's name") &&
          /[a-zA-Z]/.test(lines[i]) &&
          lines[i].length > 0
        ) {
          name = lines[i];
          break;
        }
      }
    }

    // Clean up the name by removing any non-alphabetic characters
    name = name.replace(/[^a-zA-Z\s]/g, '').trim();

    return {
      name: name,
      dob: dobMatch ? dobMatch[1] : 'Not found',
      aadhar: aadharMatch ? aadharMatch[0].replace(/\s|-/g, '') : 'Not found',
    };
  };

  const removeNonEnglishText = (text: string): string => {
    // Separate regex for Bengali and Hindi characters
    const bengaliRegex = /[\u0980-\u09FF]+/g;
    const hindiRegex = /[\u0900-\u097F]+/g;

    // Remove Bengali and Hindi characters
    let cleanedText = text.replace(bengaliRegex, '');
    cleanedText = cleanedText.replace(hindiRegex, '');

    return cleanedText;
  };

  const handleOCR = async () => {
    const imgElement = document.getElementById(
      'uploaded-image'
    ) as HTMLImageElement;
    const preprocessedMat = preprocessImage(imgElement);
    cv.imshow('canvasOutput', preprocessedMat);

    // Convert preprocessed image to data URL
    const canvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL();
    setPreprocessedImage(dataUrl);

    const worker = await Tesseract.createWorker(['eng', 'ben', 'hin']);

    const {
      data: { text },
    } = await worker.recognize(
      document.getElementById('canvasOutput') as HTMLCanvasElement,
      { rotateAuto: true }
    );

    // Remove Bengali and Hindi text from the OCR result
    const cleanedText = removeNonEnglishText(text);

    const extractedData = extractData(cleanedText);
    setResult(extractedData);

    await worker.terminate();
  };

  return (
    <div>
      <h1>Aadhar OCR</h1>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <img
          id="uploaded-image"
          src={image}
          alt="Uploaded"
          style={{ display: 'none' }}
        />
      )}
      <canvas id="canvasOutput" style={{ display: 'none' }}></canvas>
      <button onClick={handleOCR}>Extract Data</button>
      {result && (
        <pre>
          Name: {result.name}
          <br />
          DOB: {result.dob}
          <br />
          Aadhar: {result.aadhar}
        </pre>
      )}
      {preprocessedImage && <img src={preprocessedImage} alt="Preprocessed" />}
    </div>
  );
};

export default AadharOCR;
