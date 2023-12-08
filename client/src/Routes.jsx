import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Admin/Navbar";
import NewMember from "./Admin/Create Member/NewMember";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      { path: "createmember", element: <NewMember></NewMember> }],
  },
]);
