import Lottie from 'lottie-react';
import loader from './loader.json';
import { PageCenter } from '../common/PageCenter';

const style = {
  height: '20vh',
  width: '20vw',
};

export const ScriptLoadingFallback = () => {
  return (
    <PageCenter>
      <Lottie animationData={loader} style={style} />
    </PageCenter>
  );
};
