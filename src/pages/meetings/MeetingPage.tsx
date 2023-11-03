import classNames from "classnames";
import Navbar from "../Navbar";

export function MeetingPage({}): JSX.Element {
  return (
    <div
      className={classNames(
        "container px-4 mx-auto flex flex-col gap-3 min-h-screen"
      )}
    >
      <Navbar />

      <div className="my-auto mx-6 py-8 flex flex-col xl:flex-row gap-16">
        <p>Meeting </p>
      </div>
    </div>
  );
}
