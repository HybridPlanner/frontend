import { X } from "lucide-react";

type TagElementProps = {
  onClick: () => void;
  email: string;
};

export function TagElement(props: TagElementProps): JSX.Element {
  return (
    <span className="rounded-full bg-gray-300 text-gray-800 inline-flex flex-row gap-2 pl-4 pr-2 py-1 items-center">
      {props.email}

      <button type="button" aria-label="Delete item" onClick={props.onClick}>
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </span>
  );
}
