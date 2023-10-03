import classNames from "classnames";
import React, { ReactElement, ReactHTML, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";

type CardProps = {
  icon?: ReactElement<LucideIcon>;
  title?: string;
  actions?: ReactElement[];
  withoutBackground?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  children,
  withoutBackground = false,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      {...props}
      className={classNames(
        withoutBackground
          ? "bg-transparent"
          : "rounded-lg bg-white border border-gray-200 shadow px-8",
        "pt-10 pb-6",
        className
      )}
    >
      <header className="flex flex-row items-center gap-4 mb-4">
        {props.title && props.icon ? (
          <span className="bg-[#D1E9FF] text-blue-500 rounded-full inline-block p-2">
            {props.icon}
          </span>
        ) : undefined}
        {props.title && (
          <h1 className="text-2xl font-bold text-blue-500">{props.title}</h1>
        )}
      </header>
      <div className="pb-2">{children}</div>
      <div className="flex flex-row justify-end gap-2 pt-2">
        {props.actions}
      </div>
    </div>
  );
}
