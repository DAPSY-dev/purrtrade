import { Component, ReactNode, ErrorInfo } from "react";
import { connect } from "react-redux";
import Button from "./Button";

type ErrorBoundaryProps = {
  strings: { [key: string]: string };
  stringsLoading: boolean;
  stringsError: string | null;
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
    const { strings, stringsLoading, stringsError, children } = this.props;

    if (hasError) {
      if (stringsLoading) {
        return null;
      }

      if (stringsError) {
        console.error(stringsError);
        return null;
      }

      return (
        <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen bg-gray-100 text-center">
          <h1 className="font-bold text-6xl text-gray-700">
            {strings["OOPS"]}
          </h1>
          <p className="text-lg text-gray-500">
            {strings["SOMETHING_WENT_WRONG"]}{" "}
            {strings["PLEASE_TRY_AGAIN_LATER"]}
          </p>
          <Button as="router-link" to="/" className="mt-4">
            {strings["GO_BACK_HOME"]}
          </Button>
        </div>
      );
    }

    return <>{children}</>;
  }
}

function mapStateToProps(state: any) {
  return {
    strings: state.strings.strings,
    stringsLoading: state.strings.loading,
    stringsError: state.strings.error,
  };
}

export default connect(mapStateToProps)(ErrorBoundary);
