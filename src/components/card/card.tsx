import classNames from "classnames";
import React, { ReactElement, ReactHTML, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { Header } from "../Header";

type CardProps = {
  icon?: ReactElement<LucideIcon>;
  cardTitle?: string;
  actions?: ReactElement[];
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  children,
  cardTitle,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      {...props}
      className={classNames(
        "pt-10 pb-6 rounded-lg bg-white border border-gray-200 shadow px-8",
        className
      )}
    >
      <Header icon={props.icon}>{cardTitle}</Header>
      <div className="pb-2">{children}</div>
      <div className="flex flex-row justify-end gap-2 pt-2">
        {props.actions}
      </div>
    </div>
  );
}
