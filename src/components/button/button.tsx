import classNames from "classnames";
import { HTMLAttributes, forwardRef } from "react";

type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          "bg-blue-600 text-white px-4 py-3.5 rounded-lg font-semibold",
          "hover:bg-blue-500 transition-colors ease-in-out duration-150",
          "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500",
          className
        )}
      ></button>
    );
  }
);
