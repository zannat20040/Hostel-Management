import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/paymentCheck");
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });


  const HandlePaymentSuccess=(id)=>{
    console.log(id)
    axios.patch(`http://localhost:5000/members/${id}`, {status:'payment done'})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="min-h-screen bg-base-200 px-6 overflow-x-auto py-10">
      <table className="table bg-slate-100 shadow-lg rounded-none">
        {/* head */}
        <thead>
          <tr className=" bg-slate-400 text-white text-center">
            <th className="py-3">No.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Month Starting from</th>
            <th>Payable Amount</th>
            <th>booking amount</th>
            <th>Advance</th>
            <th>Status</th>
            <th>Due pay</th>
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
                <td>{parseInt(member?.monthlyPayment)*parseInt(member.dueMonth)}</td>
                <td>{member?.bookingAmount}</td>
                <td>{member?.advanceAmount}</td>
                <td>
                  {payments?.find(
                    (payment) => payment?.memberId === member?._id
                  ) ? (
                    <button onClick={()=>HandlePaymentSuccess(member?._id)}  className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white">
                      Pay
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>
                {payments?.find(
                    (payment) => payment?.memberId === member?._id
                  ) ? (
                    <button className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white">
                      Due
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                    >
                      Due
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllMembers;
