import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import { Button } from "../components/base/button/button"
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("Louis DePierre");
  const [email, setEmail] = useState("louis@depierre.com");
  const [avatar, setAvatar] = useState("../../img/avatar.png");
  const navigate = useNavigate();
  
  const handleTryButtonClick = () => {
    navigate("/login");
  }
  
  return (
    <div className="container px-4 mx-auto flex flex-col gap-3">
      <Navbar name={name} email={email} avatar={avatar} />
      <div className="mt-12 mx-6 md:ml-36 md:w-1/2">
        <img src="../../img/logo.png" alt="logo" className="w-24 h-24 md:w-40 md:h-40" />
        <div className="w-full text-blue-500 text-3xl md:text-5xl font-normal leading-tight break-words">
          Rainbow Meetings with external participants made easy.
        </div>
        <p className="mt-5 text-justify">Lorem ipsum dolor sit amet consectetur. Erat felis faucibus lorem elementum egestas dictumst pellentesque faucibus. Etiam dui leo vulputate pellentesque lectus cursus massa. Lectus dui tristique sit enim ut. Nisl sodales felis tortor volutpat facilisi velit orci. Imperdiet vitae imperdiet ultrices sed euismod.</p>
        <Button className="mt-4" onClick={handleTryButtonClick}>Try HybridPlanner</Button>
      </div>
      <div className="-z-50 absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-200 via-blue-50 to-transparent blur-md"></div>
    </div>
  )
}