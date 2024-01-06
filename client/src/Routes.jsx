import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Admin/Navbar";
import NewMember from "./Admin/Create Member/NewMember";
import AllMembers from "./Admin/All member/AllMembers";
import Invoice from "./Admin/Invoice/Invoice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      { path: "/", element: <NewMember></NewMember> },
      { path: "members", element: <AllMembers></AllMembers> },
      // { path: "/invoice/:id", element: <Invoice></Invoice> },
    ],
  },
]);
