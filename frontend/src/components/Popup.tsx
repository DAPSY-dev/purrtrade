import { useEffect, useRef, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";
import { classNames } from "@/utils/helpers";

type PopupProps = {
  variant?: "popup";
  show?: boolean;
  onHide?: () => void;
  closeButton?: boolean;
  toggleMode?: "auto" | "hint" | "manual";
  className?: string;
  children?: ReactNode;
};

function Popup({
  variant = "popup",
  show = false,
  onHide = () => {},
  closeButton = false,
  toggleMode = "auto",
  className,
  children,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const { strings } = useStrings();

  useEffect(() => {
    if (show) {
      handleShow();
    } else {
      handleHide();
    }
  }, [show]);

  useEffect(() => {
    const eventsController = new AbortController();

    popupRef.current?.addEventListener(
      "toggle",
      (e: ToggleEvent) => {
        if (e.newState === "closed") {
          onHide();
        }
      },
      {
        signal: eventsController.signal,
      }
    );

    return () => {
      eventsController.abort();
    };
  }, [onHide]);

  if (strings === null) {
    return null;
  }

  function handleShow() {
    popupRef.current?.showPopover();
  }

  function handleHide() {
    popupRef.current?.hidePopover();
  }

  const classes = classNames([
    variant === "popup" &&
      "popup-backdrop m-auto p-4 w-[calc(100%-2rem)] max-w-xl max-h-[calc(100dvh-2rem)] rounded-md bg-white shadow-md transition-discrete transition-[display,opacity] animate-fade-in",
    variant === "popup" && !show && "opacity-0",
    className,
  ]);

  return (
    <div {...{ popover: toggleMode }} className={classes} ref={popupRef}>
      <div className="grid gap-4">
        {closeButton ? (
          <div className="text-end">
            <CTA
              variant="none"
              className="cursor-pointer"
              onClick={handleHide}
              aria-label={strings["CLOSE"]}
            >
              <XMarkIcon className="size-6 text-black" />
            </CTA>
          </div>
        ) : null}

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Popup;
