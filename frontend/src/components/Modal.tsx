import { ReactNode } from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CTA from "@/components/CTA";
import { useStrings } from "@/hooks/useStrings";
import { classNames } from "@/utils/helpers";

ReactModal.setAppElement("#root");

type ModalProps = ReactModalProps & {
  shouldRenderCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
};

function Modal({
  shouldRenderCloseButton = true,
  className,
  overlayClassName,
  children,
  ...rest
}: ModalProps) {
  const strings = useStrings();

  if (strings === null) {
    return null;
  }

  const classes = classNames([
    "m-auto max-h-full w-full max-w-xl overflow-auto rounded-sm bg-white p-4 shadow-md",
    className,
  ]);

  const overlayClasses = classNames([
    "fixed inset-0 flex bg-app-backdrop p-4 opacity-0 transition-opacity duration-150",
    overlayClassName,
  ]);

  return (
    <ReactModal
      className={classes}
      overlayClassName={{
        base: overlayClasses,
        afterOpen: "opacity-100",
        beforeClose: "!opacity-0",
      }}
      closeTimeoutMS={150}
      {...(rest as ReactModalProps)}
    >
      {shouldRenderCloseButton && rest.onRequestClose && (
        <div className="pb-4 text-end">
          <CTA
            className="cursor-pointer leading-none text-black transition hover:text-secondary"
            aria-label={strings["CLOSE"]}
            onClick={rest.onRequestClose}
          >
            <XMarkIcon className="inline-block size-6" />
          </CTA>
        </div>
      )}

      {children}
    </ReactModal>
  );
}

export default Modal;
