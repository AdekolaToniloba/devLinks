import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses = "btn w-full";
  const variantClasses =
    variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
