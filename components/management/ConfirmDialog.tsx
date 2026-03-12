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
      <p className="text-[#6B7280] mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-[#E5E1F5] text-[#1A1A2E] font-medium hover:bg-[#F8F7FF]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            variant === "danger"
              ? "bg-[#EF4444] hover:bg-red-700"
              : "bg-[#7C5CBF] hover:bg-[#4A3480]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
