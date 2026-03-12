"use client";

export function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-sm text-[#1A1A2E] mb-1">
        {label}
        {required && <span className="text-[#EF4444]"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
