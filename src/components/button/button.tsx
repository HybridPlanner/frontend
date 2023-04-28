import classNames from "classnames";
import { ReactElement, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";

type ButtonProps = {
  icon?: ReactElement<LucideIcon>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          "bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold",
          "hover:bg-blue-500 transition-colors ease-in-out duration-150",
          "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500",
          "inline-flex gap-1",
          className
        )}
      >
        {props.icon}
        {children}
      </button>
    );
  }
);
