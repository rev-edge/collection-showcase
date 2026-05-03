// V0 stub — labeled input. Implemented when first needed.
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...rest }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-xs text-white/60">{label}</span>}
      <input {...rest} />
    </label>
  );
}
