import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

// Base styles shared by every variant
const BASE =
  "inline-flex items-center justify-center gap-2 font-extrabold uppercase tracking-wide border-3 cursor-pointer transition-all duration-100 " +
  "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover dark:hover:shadow-[3px_3px_0px_0px_#d4d4d8] " +
  "active:translate-x-[5px] active:translate-y-[5px] active:shadow-neo-active dark:active:shadow-none " +
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-neo dark:disabled:shadow-[5px_5px_0px_0px_#d4d4d8]";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8]",
  secondary:
    "bg-card-bg dark:bg-zinc-800 text-text-main dark:text-zinc-100 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8]",
  danger:
    "bg-urgent text-white border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "text-base py-2 px-5",
  md: "text-xl py-3 px-6",
  lg: "text-2xl py-3 px-8",
};

/**
 * Reusable neo-brutalist Button.
 *
 * @example
 * // Primary (default)
 * <Button onClick={handleSubmit}>Save</Button>
 *
 * @example
 * // Secondary (cancel/neutral)
 * <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
 *
 * @example
 * // Small with icon
 * <Button variant="primary" size="sm" disabled={loading}>
 *   <Save size={16} /> {loading ? "Saving..." : "Save Name"}
 * </Button>
 *
 * @example
 * // Full-width
 * <Button fullWidth disabled={loading}>Sign In</Button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}