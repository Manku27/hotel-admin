import { ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

const LazyComponentWrapper = ({ children }: Props) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

export default LazyComponentWrapper;
