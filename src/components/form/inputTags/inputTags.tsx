import classNames from "classnames";
import { LucideIcon } from "lucide-react";
import { ReactElement, forwardRef } from "react";

import { ChangeHandler, Controller } from "react-hook-form";
import { ReactMultiEmail } from "react-multi-email";
import { TagElement } from "./Tag";
import "./inputTag.css";

export type InputTagsProps = {
  id: string;
  label?: string;
  icon?: ReactElement<LucideIcon>;
  error?: string;
  suggestions?: string[];
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value?: string[];
  onChange?: (emails: string[]) => void;
};

export const InputTags = forwardRef<HTMLDivElement, InputTagsProps>(
  (
    { id, label, error, className, disabled, ...props }: InputTagsProps,
    ref
  ): JSX.Element => {
    return (
      <div className={classNames("relative mb-6 group", className)}>
        {/* If the input tags has a label props, render it */}
        {label && (
          <label
            htmlFor={id}
            className="font-semibold text-gray-700 text-sm group-focus-within:text-blue-500"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {/* We're using the react-multi-email library to handle the mails input */}
          <ReactMultiEmail
            className={classNames(
              "relative group inputTags",
              "flex flex-wrap flex-row gap-2 items-center",

              "transition-all duration-100 ease-in-out",
              "py-2.5 px-3 w-full h-full outline-none border border-gray-300 rounded-lg shadow-xs",
              "disabled:bg-gray-100 disable:text-gray-500",
              {
                "pl-10": props.icon,
              },
              error
                ? "border-red-500 focus:ring-2 ring-red-500 ring-offset-2"
                : "group-focus-within:border-blue-500"
            )}
            inputClassName="outline-none"
            placeholder={props.placeholder || label}
            id={id}
            aria-invalid={!!error ? "true" : "false"}
            onChange={props.onChange}
            emails={props.value}
            getLabel={(email, index, removeEmail) => (
              // To be able to customize the input, we're using our own TagElement component
              <TagElement
                key={index}
                data-tag
                onClick={() => removeEmail(index)}
                email={email}
              />
            )}
          />
          {/* If the input tags has an icon props, render it */}
          <div
            className={classNames(
              "absolute pointer-events-none inset-y-0 left-0 flex items-center pl-3 text-gray-500 peer-disabled:text-gray-500",
              error ? "text-red-500" : "group-focus-within:text-blue-500"
            )}
            aria-hidden="true"
          >
            {props.icon}
          </div>
        </div>
        {/* If the input tags has an error props, render it */}
        {error && (
          <span className="text-sm text-red-500 px-2 absolute -bottom-6">
            {error}
          </span>
        )}
      </div>
    );
  }
);
