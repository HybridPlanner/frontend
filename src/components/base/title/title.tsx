import classNames from "classnames";
import { type LucideIcon } from "lucide-react";
import { ReactElement, forwardRef } from "react";

type TitleProps = {
  icon?: LucideIcon;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ icon: Icon, ...props }, ref) => {
    return (
      <h1
        {...props}
        ref={ref}
        className={classNames(
          "text-blue-600 text-2xl font-semibold inline-grid grid-flow-col gap-2 items-center"
        )}
      >
        {Icon && (
          <span
            className="rounded-full bg-blue-100 px-3 py-3"
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" />
          </span>
        )}
        {props.children}
      </h1>
    );
  }
);
