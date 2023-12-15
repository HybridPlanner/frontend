import classNames from "classnames";
import { LucideIcon } from "lucide-react";
import { ReactElement, forwardRef } from "react";
import { ReactTags, Tag } from "react-tag-autocomplete";

export type InputTagsProps = {
  id: string;
  label?: string;
  icon?: ReactElement<LucideIcon>;
  error?: string;
  suggestions?: Tag[];
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value?: Tag[];
  emptyState: string;
  onChange?: (emails: Tag[]) => void;
  onChangeInput?: (search: string) => void;
};

export const InputTags = forwardRef<HTMLDivElement, InputTagsProps>(
  (
    {
      id,
      label,
      error,
      className,
      disabled,
      suggestions,
      emptyState,
      ...props
    }: InputTagsProps,
    ref
  ): JSX.Element => {
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

        <ReactTags
          labelText={label}
          selected={props.value ?? []}
          suggestions={suggestions ?? []}
          onAdd={(tag) => {
            props.onChange?.([...(props.value ?? []), tag]);
          }}
          onDelete={(index) => {
            props.onChange?.((props.value ?? []).filter((_, i) => i !== index));
          }}
          noOptionsText={emptyState}
        />
        {error && (
          <span className="text-sm text-red-500 px-2 absolute -bottom-6">
            {error}
          </span>
        )}
      </div>
    );
  }
);
