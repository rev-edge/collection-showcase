// V0 stub — primary/secondary button variants. Implemented when first needed.
import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return <button {...props} />;
}
