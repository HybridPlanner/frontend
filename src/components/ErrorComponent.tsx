import { Link } from "react-router-dom";
import { Button } from "./base/button/button";

export function ErrorComponent({ error }: { error: Error }): JSX.Element {
  return (
    <div className="container px-4 mx-auto flex flex-col gap-4 items-center my-5">
      <p className="uppercase tracking-wide text-slate-600">Error</p>
      <h1 className="text-2xl font-bold text-center">{error.message}</h1>
      <Link to="/">
        <Button>Back to homepage</Button>
      </Link>
    </div>
  );
}
