import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import Interviews from "./Pages/Interviews.jsx";
import MyNotes from "./Pages/MyNotes.jsx";
import Practice from "./Pages/Practice.jsx";
import Profile from "./Pages/Profile.jsx";
import MainContent from "./Components/MainContent.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Coding from "./Pages/Coding.jsx";
import Aptitude from "./Pages/Aptitude.jsx";
import SelectTest from "./Components/SelectTest.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { index: true, element: <MainContent /> }, // Default page for /
      { path: "Dashboard", element: <MainContent /> },
      { path: "Interviews/:id?", element: <Interviews /> },
      { path: "MyNotes", element: <MyNotes /> },
      {
        path: "Practice/",
        element: <Practice />,
        children: [
          { path: "", element: <SelectTest /> },
          { path: "Coding/:id?/:id1?/:id2?", element: <Coding /> },
          { path: "Aptitude/:id?", element: <Aptitude /> },
        ],
      },
      { path: "Profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
