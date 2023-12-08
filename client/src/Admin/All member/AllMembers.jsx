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
    <div className="container my-auto overflow-x-scroll md:overflow-x-auto mt-10">
      <table className="table bg-slate-100 shadow-lg rounded-none">
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
          {isLoading ? (
            <div className="py-4 w-10 mx-auto">
              <span className="loading loading-ring loading-lg "></span>
            </div>
          ) : (
            members?.map((member, index) => (
              <tr className="text-center">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={member?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{member?.name}</td>
                <td>{member?.phoneNumber}</td>
                <td>{member?.bookingDate}</td>
                <td>{member?.bookingAmount}</td>
                <td>{member?.advanceAmount}</td>
                <th>
                  <button className="btn btn-sm w-full capitalize rounded-none bg-indigo-300 border-0 text-white">
                    pay
                  </button>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllMembers;
