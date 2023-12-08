import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";


const AllMembers = () => {
  const query = useQuery({ 
    queryKey: ['todos'], 
    queryFn: ()=>{
      axios.get('http://localhost:5000/')
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    } 
  })
  console.log(query)
  

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>booking date</th>
            <th>booking amount</th>
            <th>Advance</th>
            <th>Status</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
      
        </tbody>
     
      </table>
    </div>
  );
};

export default AllMembers;
