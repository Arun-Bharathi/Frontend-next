"use client";

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { IconX } from "@tabler/icons-react";

type ModalSize = "sm" | "md" | "lg";
type ModalAlign = "left" | "center";

type CustomResponsiveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  icon?: ReactNode;
  size?: ModalSize;
  align?: ModalAlign;
  showHeaderDivider?: boolean;
  bodyClassName?: string;
};

const sizeClassNames: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

export default function CustomResponsiveModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  icon,
  size = "md",
  align = "left",
  showHeaderDivider = true,
  bodyClassName = "px-5 py-6 sm:px-6",
}: CustomResponsiveModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && !dialog?.open) {
      dialog?.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={handleCancel}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] ${sizeClassNames[size]} overflow-hidden rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/55`}
    >
      <div className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl">
        <header
          className={`relative px-5 py-5 sm:px-6 ${
            showHeaderDivider ? "border-b border-slate-200" : ""
          } ${align === "center" ? "text-center" : "pr-14 sm:pr-16"}`}
        >
          {icon && (
            <div className={align === "center" ? "flex justify-center" : ""}>
              {icon}
            </div>
          )}
          <h3
            id={titleId}
            className={`${icon ? "mt-4" : ""} text-xl font-bold text-slate-900`}
          >
            {title}
          </h3>
          {description && (
            <div
              id={descriptionId}
              className="mt-2 text-sm leading-6 text-slate-500"
            >
              {description}
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-slate-200 sm:right-5 sm:top-5"
          >
            <IconX size={20} aria-hidden="true" />
          </button>
        </header>

        {children && <div className={bodyClassName}>{children}</div>}

        {footer && (
          <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  );
}
