import { X } from "lucide-react";
import * as SlateReact from "slate-react";

type TagElementProps = SlateReact.RenderElementProps & {
  onClick: () => void;
};

export function TagElement(props: TagElementProps): JSX.Element {
  if (props.element.type !== "tag") return <></>;

  console.log(props);

  return (
    <span
      className="rounded-full bg-gray-300 text-gray-800 inline-flex flex-row gap-2 pl-4 pr-2 py-1 items-center"
      {...props.attributes}
    >
      {props.children}

      <button type="button" aria-label="Delete item">
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </span>
  );
}
