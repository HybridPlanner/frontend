import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import { MeetingsDashboard } from "./pages/meetings/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <MeetingsDashboard />,
      },
    ],
  },
]);

export default router;
