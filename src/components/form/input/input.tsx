import { ReactElement, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import classNames from "classnames";

export type InputProps = {
  id: string;
  label?: string;
  icon?: ReactElement<LucideIcon>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div className="relative mb-8">
        {label && (
          <label htmlFor={id} className="font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            {...props}
            placeholder={label}
            id={id}
            ref={ref}
            className={classNames(
              "py-2.5 px-3 w-full h-full focus:outline-none border border-gray-300 rounded-lg shadow",
              "peer disabled:bg-gray-200 disable:text-gray-500",
              "focus:border-blue-500  invalid:border-red-500",
              {
                "border-red-500 focus:ring-2 ring-red-500 ring-offset-2": error,
                "pl-10": props.icon,
              }
            )}
          />

          <div
            className="absolute pointer-events-none inset-y-0 left-0 flex items-center pl-3 text-gray-500 peer-focus:text-blue-500 peer-disabled:text-gray-500"
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
