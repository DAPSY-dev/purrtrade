import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router";

type ErrorBoundaryProps = {
  children: ReactNode;
};

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    function handleError(event: ErrorEvent | PromiseRejectionEvent) {
      setHasError(true);
      if ("reason" in event) {
        console.error("Unhandled promise rejection:", event.reason);
      } else {
        console.error("ErrorBoundary caught an error:", event.error);
      }
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen bg-gray-100 text-center">
        <h1 className="font-bold text-6xl text-gray-700">Oops!</h1>
        <p className="text-lg text-gray-500">
          Something went wrong. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-gray-700 text-white"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
