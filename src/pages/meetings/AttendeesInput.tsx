import { useDebouncedCallback } from "use-debounce";
import { useCallback, useState } from "react";
import { ReactTags, Tag, TagSuggestion } from "react-tag-autocomplete";
import { getAttendees } from "@/api/attendees";
import classNames from "classnames";

interface AttendeesInputProps {
  value: Tag[];
  onChange: (values: Tag[]) => void;
  error: string | undefined;
  id: string;
  setError?: (error: string) => void;
}

export const AttendeesInput = ({
  value,
  onChange,
  error,
  id,
  setError,
}: AttendeesInputProps): JSX.Element => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<TagSuggestion[]>([]);

  const onAdd = useCallback(
    (newTag: Tag) => {
      onChange?.([...(value ?? []), newTag]);
      setSuggestions([]);
    },
    [value]
  );

  const onDelete = useCallback(
    (index: number) => {
      onChange?.((value ?? []).filter((_, i) => i !== index));
    },
    [value]
  );

  const onInput = useDebouncedCallback(async (value: string) => {
    if (isBusy) return;

    setIsBusy(true);

    try {
      const suggestions = await getAttendees(value);
      setSuggestions(
        suggestions.map((suggestion) => ({
          label: suggestion.email,
          value: suggestion.email,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsBusy(false);
    }
  }, 300);

  const noOptionsText =
    isBusy && !suggestions.length ? "Loading..." : "No suggestions found";

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="font-semibold text-gray-700 text-sm group-focus-within:text-blue-500 leading-8"
      >
        Select attendees
      </label>
      <ReactTags
        ariaDescribedBy="Select attendees"
        id={id}
        noOptionsText={noOptionsText}
        onAdd={onAdd}
        onDelete={onDelete}
        onInput={onInput}
        placeholderText={value?.length ? "" : "Enter attendees emails"}
        selected={value}
        suggestions={suggestions}
        activateFirstOption={true}
        allowNew={true}
        isInvalid={!!error}
        ariaErrorMessage={error}
        onValidate={(tag) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(tag);
        }}
        classNames={{
          root: classNames(
            "transition-all duration-100",
            "py-2.5 px-3 w-full h-full outline-none border border-gray-300 rounded-lg shadow-xs relative inline-flex items-center gap-2"
          ),
          rootIsActive: "!border-blue-500",
          rootIsDisabled: "bg-gray-100 text-gray-500",
          rootIsInvalid:
            "invalid:border-red-500 border-red-500 focus:ring-2 ring-red-500 ring-offset-2",
          label: "hidden",
          tagList: "flex gap-2 flex-wrap",
          tagListItem:
            "rounded-full bg-gray-200 text-gray-800 inline-flex flex-row gap-2 px-3 h-full items-center",
          tag: "",
          tagName: "",
          comboBox: "",
          input:
            "outline-none w-full placeholder:text-gray-500 placeholder:transition-all placeholder:duration-100",
          listBox:
            "absolute z-10 top-12 bg-white rounded-lg shadow-lg left-0 w-full border border-gray-300 flex flex-col p-2",
          option: "cursor-pointer hover:bg-gray-100 rounded-lg p-2",
          optionIsActive: "bg-gray-100",
          highlight: "bg-yellow-200",
        }}
      />
      {error && <span className="text-sm text-red-500 px-2">{error}</span>}
    </div>
  );
};
