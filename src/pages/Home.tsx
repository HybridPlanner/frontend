import Navbar from "./Navbar"
import { Button } from "../components/base/button/button"
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("Louis DePierre");
  const [email, setEmail] = useState("louis@depierre.com");
  
  return (
    <div className="container px-4 mx-auto flex flex-col gap-3">
      <Navbar name={name} email={email} />
      <div className="mt-12 ml-36 w-1/2">
        <img src="../../img/logo.png" alt="logo" className="w-40 h-40" />
        <div className="w-full text-blue-500 text-5xl font-normal leading-tight break-words">
          Rainbow Meetings with external participants made easy.
        </div>
        <p className="mt-5">Lorem ipsum dolor sit amet consectetur. Erat felis faucibus lorem elementum egestas dictumst pellentesque faucibus. Etiam dui leo vulputate pellentesque lectus cursus massa. Lectus dui tristique sit enim ut. Nisl sodales felis tortor volutpat facilisi velit orci. Imperdiet vitae imperdiet ultrices sed euismod.</p>
        <Button className="mt-4">Try HybridPlanner</Button>
      </div>
      <div className="-z-50 absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-200 via-blue-50 to-transparent blur-md"></div>
    </div>
  )
}
