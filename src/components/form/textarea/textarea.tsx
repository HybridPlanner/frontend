import { ReactElement, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import classNames from "classnames";

export type TextareaProps = {
  id: string;
  label?: string;
  icon?: ReactElement<LucideIcon>;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div className="relative mb-6 group">
        {label && (
          <label
            htmlFor={id}
            className="font-semibold text-gray-700 text-sm group-focus-within:text-blue-500"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <textarea
            {...props}
            placeholder={label}
            id={id}
            ref={ref}
            className={classNames(
              "transition-all duration-100 ease-in-out",
              "py-2.5 px-3 w-full h-full outline-none border border-gray-300 rounded-lg shadow-xs",
              "disabled:bg-gray-100 disable:text-gray-500",
              "group-focus-within:border-blue-500  invalid:border-red-500",

              "placeholder:text-gray-500 placeholder:transition-all placeholder:duration-100 placeholder:ease-in-out",
              "placeholder-shown:placeholder:opacity-100 placeholder:opacity-0",
              {
                "border-red-500 focus:ring-2 ring-red-500 ring-offset-2": error,
                "pl-10": props.icon,
              }
            )}
          ></textarea>

          <div
            className="absolute pointer-events-none inset-y-0 left-0 flex items-center pl-3 text-gray-500 group-focus-within:text-blue-500 peer-disabled:text-gray-500"
            aria-hidden="true"
          >
            {props.icon}
          </div>
        </div>
        {error && <span className="text-sm text-red-500 px-2">{error}</span>}
      </div>
    );
  }
);
