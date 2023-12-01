import { getAttendees } from "@/api/attendees";
import { InputTags } from "@/components/form/inputTags/inputTags";
import { Attendee } from "@/types/Attendee";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface AttendeesInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  error: string | undefined;
}

export function AttendeesInput({
  value,
  onChange,
  error,
}: AttendeesInputProps): JSX.Element {
  const [suggestions, setSuggestions] = useState([] as Attendee[]);

  const inputChanged = useDebouncedCallback((search) => {
    if (search.length < 3) {
      setSuggestions([]);
      return;
    }
    getAttendees(search).then((data) => {
      setSuggestions(data);
    });
  }, 300);

  return (
    <InputTags
      id="attendees"
      label="Attendees"
      icon={<Pencil className="w-5 h-5" />}
      placeholder="Enter attendees emails, separated by a comma."
      className="w-full"
      onChange={(value) => {
        onChange(value);
        setSuggestions([]);
      }}
      error={error}
      value={value}
      onChangeInput={inputChanged}
      suggestions={suggestions.map((suggestion) => ({
        display: suggestion.email,
        value: suggestion.email,
      }))}
    />
  );
}
