// components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "white" | "outline-white" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = "default",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "btn-default",
    white: "btn-white",
    "outline-white": "btn-outline-white",
    ghost: "btn-ghost",
  };

  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const baseClasses = cn("btn", variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}