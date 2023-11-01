import classNames from "classnames";
import { LucideIcon } from "lucide-react";
import { ReactElement, useCallback, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withReact } from "slate-react";
import * as SlateReact from "slate-react";
import { withTags } from "./tagPlugin";
import { TagElement } from "./Tag";

export type InputTagsProps = {
  id: string;
  label?: string;
  icon?: ReactElement<LucideIcon>;
  error?: string;
  onChange: (value: string) => void;
  suggestions?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { type: "tag", value: "Louis", children: [{ text: "Tag 1" }] },
      { text: "" },
    ],
  },
];

export function InputTags({
  id,
  label,
  error,
  className,
  ...props
}: InputTagsProps): JSX.Element {
  const editor = useMemo(() => withTags(withReact(createEditor())), []);

  const renderElement = useCallback(
    ({
      children,
      ...props
    }: SlateReact.RenderElementProps): React.JSX.Element => {
      switch (props.element.type) {
        case "tag":
          return (
            <TagElement {...props} onClick={() => {}}>
              {children}
            </TagElement>
          );
        default:
          return (
            <SlateReact.DefaultElement {...props}>
              {children}
            </SlateReact.DefaultElement>
          );
      }
    },
    []
  );

  return (
    <div className={classNames("relative mb-6 group", className)}>
      {label && (
        <label
          htmlFor={id}
          className="font-semibold text-gray-700 text-sm group-focus-within:text-blue-500"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <SlateReact.Slate editor={editor} initialValue={initialValue}>
          <SlateReact.Editable
            className={classNames(
              "transition-all duration-100 ease-in-out",
              "py-2.5 px-3 w-full h-full outline-none border border-gray-300 rounded-lg shadow-xs",
              "disabled:bg-gray-100 disable:text-gray-500",

              "placeholder:text-gray-500 placeholder:transition-all placeholder:duration-100 placeholder:ease-in-out",
              "placeholder-shown:placeholder:opacity-100 placeholder:opacity-0",

              // errors
              "invalid:border-red-500",
              error
                ? "border-red-500 focus:ring-2 ring-red-500 ring-offset-2"
                : "group-focus-within:border-blue-500",

              {
                "pl-10": props.icon,
              }
            )}
            renderElement={renderElement}
            placeholder={props.placeholder || label}
            id={id}
            aria-invalid={!!error ? "true" : "false"}
          />
        </SlateReact.Slate>
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
      {error && (
        <span className="text-sm text-red-500 px-2 absolute -bottom-6">
          {error}
        </span>
      )}
    </div>
  );
}
