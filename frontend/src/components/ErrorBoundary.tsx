import { Component, ReactNode, ErrorInfo } from "react";
import { connect } from "react-redux";
import Logo from "@/components/Logo";
import Heading from "@/components/Heading";
import CTA from "@/components/CTA";
import Copyright from "@/components/Copyright";
import { StringMap } from "@/store/store";
import { RootState } from "@/store/reducers";

type ErrorBoundaryProps = {
  strings: StringMap;
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
        <div className="flex min-h-dvh flex-col items-center justify-start gap-2 bg-app-background px-4 py-12">
          <Logo className="mb-12" />

          <Heading className="text-center text-6xl md:text-6xl">
            {strings["OOPS"]}
          </Heading>

          <p className="text-center text-lg">
            {strings["SOMETHING_WENT_WRONG"]}{" "}
            {strings["PLEASE_TRY_AGAIN_LATER"]}
          </p>

          <CTA as="anchor" variant="button" href="/" className="mt-4">
            {strings["GO_BACK_HOME"]}
          </CTA>

          <Copyright className="mt-12" />
        </div>
      );
    }

    return <>{children}</>;
  }
}

function mapStateToProps(state: RootState) {
  return {
    strings: state.strings.strings,
    stringsLoading: state.strings.loading,
    stringsError: state.strings.error,
  };
}

export default connect(mapStateToProps)(ErrorBoundary);
