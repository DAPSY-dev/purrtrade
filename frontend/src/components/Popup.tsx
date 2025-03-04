import { useEffect, useRef, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";
import { classNames } from "@/utils/helpers";

type PopupProps = {
  show?: boolean;
  onHide?: () => void;
  variant?: "popup" | "none";
  backdrop?: boolean;
  closeButton?: boolean;
  toggleMode?: "auto" | "hint" | "manual";
  className?: string;
  children?: ReactNode;
};

function Popup({
  show = false,
  onHide = () => {},
  variant = "none",
  backdrop = false,
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
      "popup-fade popup-backdrop m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl rounded-md bg-white p-4 shadow-md",
    variant === "popup" && !show && "opacity-0",
    variant === "none" &&
      "popup-fade m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)]",
    backdrop && "popup-backdrop",
    className,
  ]);

  const closeButtonClasses = classNames([
    variant === "popup" && "text-end",
    variant === "none" && "text-end",
  ]);

  return (
    <div {...{ popover: toggleMode }} className={classes} ref={popupRef}>
      <div className="grid gap-4">
        {closeButton ? (
          <div className={closeButtonClasses}>
            <CTA
              className="cursor-pointer text-black transition hover:text-secondary"
              onClick={handleHide}
              aria-label={strings["CLOSE"]}
            >
              <XMarkIcon className="size-6 text-current" />
            </CTA>
          </div>
        ) : null}

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Popup;
