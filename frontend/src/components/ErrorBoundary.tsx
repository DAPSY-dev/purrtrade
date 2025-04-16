import { Component, ReactNode, ErrorInfo } from "react";
import Logo from "@/components/Logo";
import Heading from "@/components/Heading";
import CTA from "@/components/CTA";
import Copyright from "@/components/Copyright";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error(info.componentStack);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-start gap-2 bg-app-background px-4 py-12">
          <Logo className="mb-12" />

          <Heading className="text-center text-6xl md:text-6xl">Oops!</Heading>

          <p className="text-center text-lg">
            Something went wrong. Please try again later.
          </p>

          <CTA as="anchor" variant="button" href="/" className="mt-4">
            Go back home
          </CTA>

          <Copyright className="mt-12" />
        </div>
      );
    }

    return <>{children}</>;
  }
}

export default ErrorBoundary;
