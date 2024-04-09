import { ReactNode, Suspense } from 'react';
import { ScriptLoadingFallback } from './ScriptLoadingFallback';

interface Props {
  children: ReactNode;
}

const LazyComponentWrapper = ({ children }: Props) => (
  <Suspense fallback={<ScriptLoadingFallback />}>{children}</Suspense>
);

export default LazyComponentWrapper;
