import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-300 text-body-s mb-1">{label}</label>
        <input
          ref={ref}
          className={`input ${error ? "input-error" : ""}`}
          {...props}
        />
        {error && <p className="text-accent text-body-s mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
