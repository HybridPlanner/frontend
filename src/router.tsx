import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import { MeetingsDashboard } from "./pages/meetings/Dashboard";
import { MeetingPage } from "./pages/meetings/MeetingPage";

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
      {
        path: "/meeting/:id",
        element: <MeetingPage />,
      },
    ],
  },
]);

export default router;
