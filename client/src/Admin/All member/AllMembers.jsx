import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Button from "../../Shared Component/Button";

const AllMembers = () => {
  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/members");
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
  console.log(members, isLoading);

  // if (isLoading) {
  //   return (
  //     <div className="container mx-auto mt-5">
  //       <span className="loading loading-ring loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-6 ">
      <table className="table  bg-slate-100 rounded-none ">
        {/* head */}
        <thead>
          <tr className=" bg-slate-400 text-white text-center">
            <th className="py-3">No.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>booking date</th>
            <th>booking amount</th>
            <th>Advance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
         
        </tbody>
      </table>
    </div>
  );
};

export default AllMembers;
