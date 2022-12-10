import { Suspense } from "react";

const LoadingBoundary = ({ children, fallback }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default LoadingBoundary;
