import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <HeadlessDialog
      open={open}
      onClose={() => onOpenChange(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </HeadlessDialog>
  );
}

export function DialogTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DialogContent({ children, className = "" }) {
  return (
    <DialogPanel
      className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}
    >
      {children}
    </DialogPanel>
  );
}

export function DialogHeader({ children, className = "" }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}
    >
      {children}
    </div>
  );
}

export { DialogTitle };
