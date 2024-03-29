import logo from "@/assets/img/logo.png";
import { Link } from "react-router-dom";

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

interface NavBarProps {
  user?: UserInfo;
}

export default function Navbar({ user }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between flex-wrap mt-5 px-4 h-12">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
        <p className="font-bold text-xl md:text-3xl">
          <span className="text-blue-500">Hybrid</span>
          <span className="text-blue-900">Planner</span>
        </p>
      </Link>
      {user && (
        <div className="">
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="hidden md:flex flex-col">
              <p className="font-bold text-grey-700">{user.name}</p>
              <p className="text-grey-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
