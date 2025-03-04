import { createPortal } from "react-dom";
import { classNames } from "@/utils/helpers";

type LoaderElementProps = {
  className?: string;
};

function LoaderElement({ className }: LoaderElementProps) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        data-testid="loader-img"
      >
        <g stroke="currentColor">
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            strokeLinecap="round"
            strokeWidth="3"
          >
            <animate
              attributeName="stroke-dasharray"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0 150;42 150;42 150;42 150"
            />
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0;-16;-59;-59"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            dur="2s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </g>
      </svg>
    </div>
  );
}

type LoaderProps = {
  fullPage?: boolean;
  className?: string;
};

function Loader({ fullPage = false, className }: LoaderProps) {
  const classes = classNames([
    fullPage ? "fixed" : "absolute z-10",
    "inset-0 flex items-center justify-center bg-app-background p-4",
    className,
  ]);

  if (fullPage) {
    return createPortal(
      <LoaderElement className={classes} />,
      document.getElementById("portal-loader")!
    );
  }

  return <LoaderElement className={classes} />;
}

export default Loader;
