import classNames from "classnames";
import { type LucideIcon } from "lucide-react";
import { Link, LinkProps, To } from "react-router-dom";

type BaseButtonProps = {
  icon?: LucideIcon;
  iconClassName?: string;
  textColor?: string;
  bgColor?: string;
  outlineColor?: string;
  borderColor?: string;
  disabled?: boolean
};

type ButtonPropsAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

type ButtonPropsAsLink = BaseButtonProps &
  Omit<
    LinkProps & React.RefAttributes<HTMLAnchorElement>,
    keyof BaseButtonProps
  >;

type ButtonProps = ButtonPropsAsLink | (ButtonPropsAsButton & { to?: never });


export function Button<T>({
  className,
  children,

  textColor = "text-white disabled:text-gray-500",
  bgColor = "bg-blue-600 hover:enabled:bg-blue-500 disabled:bg-gray-300",
  outlineColor = "outline-blue-600",
  borderColor = "",
  icon: Icon,
  iconClassName = "",

  disabled = false,

  ...props
}: ButtonProps) {
  const classes = classNames(
    "px-4 py-2 rounded-lg motion-safe:transition-all duration-150",
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

    className
  );

  // If the button is a link, use the Link component from react-router-dom
  if (props.to) {
    const propsAsLink = props as ButtonPropsAsLink;

    return (
      <Link {...propsAsLink} className={classes} aria-disabled={disabled}>
        {Icon && <Icon className={classNames("w-6 h-6", iconClassName)} />}
        {children}
      </Link>
    );
  }

  const propsAsButton = props as ButtonPropsAsButton;

  return (
    <button {...propsAsButton} className={classes} disabled={disabled}>
      {Icon && <Icon className={classNames("w-6 h-6", iconClassName)} />}
      {children}
    </button>
  );
}
