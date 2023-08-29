import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "../Pages/LandingPage";
import { Playground } from "../Pages/Playground";

import "./main.css";
import "allotment/dist/style.css";

import "../assets/DroidSansMono.ttf";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "playground/:playgroundId",
    element: <Playground />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
