import classNames from "classnames";
import { ReactElement, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";

type ButtonProps = {
  icon?: LucideIcon;
  textColor?: string;
  bgColor?: string;
  outlineColor?: string;
  borderColor?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,

      textColor = "text-white disabled:text-gray-500",
      bgColor = "bg-blue-600 hover:enabled:bg-blue-500 disabled:bg-gray-300",
      outlineColor = "outline-blue-600",
      borderColor = "",
      icon: Icon,

      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          "px-4 py-2.5 rounded-lg motion-safe:transition-all duration-150 ease-in-out",
          "outline-offset-2 outline-2 focus:outline",

          "disabled:cursor-not-allowed disabled:opacity-75",
          "inline-grid grid-flow-col gap-2 items-center",

          "drop-shadow-sm",
          "enabled:active:scale-95 enabled:active:drop-shadow-md",

          // Variants
          textColor,
          bgColor,
          outlineColor,
          borderColor,

          /*"bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold",
          "hover:bg-blue-500 transition-colors ease-in-out duration-150",
          "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500",
          "outline:transparent outline-blue-600 outline-2 outline-offset-2",
          "inline-flex gap-1",*/
          className
        )}
      >
        ()
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  }
);
