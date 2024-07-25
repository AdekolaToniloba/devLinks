import React from "react";
import { AlertCircle } from "lucide-react";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
}) => {
  const baseClasses = "rounded-lg p-4 mb-4";
  const variantClasses =
    variant === "destructive"
      ? "bg-red-50 text-red-900"
      : "bg-blue-50 text-blue-900";

  return (
    <div className={`${baseClasses} ${variantClasses}`} role="alert">
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
}) => <div className="mt-2 text-sm">{children}</div>;

interface AlertTitleProps {
  children: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => (
  <h3 className="text-lg font-medium">{children}</h3>
);

export const AlertIcon: React.FC = () => (
  <AlertCircle className="h-5 w-5 inline-block mr-2" />
);
