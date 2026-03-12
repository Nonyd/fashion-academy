"use client";

import { Modal } from "./Modal";

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  variant = "safe",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "safe";
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-[var(--color-muted)] mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-white/10 text-[var(--color-ivory)] font-medium hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-xl font-medium ${
            variant === "danger"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-[var(--color-gold)] text-[var(--color-noir)] hover:bg-[var(--color-gold-light)]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
