import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Admin/Navbar";
import NewMember from "./Admin/Create Member/NewMember";
import AllMembers from "./Admin/All member/AllMembers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      { path: "/", element: <NewMember></NewMember> },
      { path: "members", element: <AllMembers></AllMembers> },
    ],
  },
]);
