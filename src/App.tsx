import { Outlet } from "react-router-dom";

export default function App() {
    return <div className="container px-4 mx-auto">
        <Outlet />
    </div>
}