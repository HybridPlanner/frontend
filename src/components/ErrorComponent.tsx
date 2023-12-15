import { Link } from "react-router-dom";
import { Button } from "./base/button/button";
import Navbar from "@/pages/Navbar";
import logoImg from "@/assets/img/logo.png";

export function ErrorComponent({ error }: { error: string }): JSX.Element {
  return (
    <div className="container px-4 mx-auto flex flex-col gap-3">
      <Navbar />
      <div className="mt-12 mx-6 xl:ml-36 lg:w-2/3 xl:w-1/2 flex flex-col gap-2 items-start">
        <img src={logoImg} alt="logo" className="w-24 h-24 md:w-40 md:h-40" />
        <div className="w-full text-red-500 text-3xl md:text-5xl font-normal leading-tight break-words tracking-tight">
          Oops! Something went wrong
        </div>
        <p className="text-slate-600 mt-3 text-lg">{error}</p>
        <Link to="/">
          <Button>Return to the home page</Button>
        </Link>

        <div className="fixed w-full h-full overflow-hidden top-0 left-0 -z-20">
        <div className="-z-50 absolute top-1/2 -left-1/2 w-full rounded-3xl h-full bg-red-500 bg-opacity-30 transform-gpu -rotate-12 blur-3xl"></div>
        <div className="-z-50 absolute -top-1/2 -right-1/2 w-full rounded-3xl h-full bg-indigo-500 bg-opacity-30 transform-gpu -rotate-12 blur-3xl"></div>
      </div>
      </div>
    </div>
  );
}