import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useState } from "react";
import Invoice from "../Invoice/Invoice";

const AllMembers = () => {
  const [memberId, setMemberId] = useState(null);
  // fetching members data
  const {
    data: members,
    isLoading,
    refetch,
  } = useQuery({
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

  // print invoice
  const HandlePrintInvoice = (id) => {
    setMemberId(id);
  };
  // monthlypayement handle
  const HandlePaymentSuccess = (id, date, index, dueMonth) => {
    const recentDate = new Date(date);
    recentDate.setMonth(recentDate.getMonth() + 1);

    if (dueMonth > 0) {
      const inputValue = document.getElementById(`recivePayment${index}`).value;
      console.log("amount: ", inputValue);
      axios
        .patch(`http://localhost:5000/members/${id}`, {
          bookingDate: recentDate,
          clearMonth: inputValue,
        })
        .then((res) => {
          refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .patch(`http://localhost:5000/members/${id}`, {
          bookingDate: recentDate,
        })
        .then((res) => {
          refetch();
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // due handle
  const HandleDue = (id, dueMonth, date) => {
    const recentDate = new Date(date);
    recentDate.setMonth(recentDate.getMonth() + 1);

    axios
      .patch(`http://localhost:5000/members/${id}`, {
        updatedDueMonth: dueMonth + 1,
        bookingDate: recentDate,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // member checkout handle
  const HandleLeave = (e, id) => {
    e.preventDefault();
    const leavingDate = new Date(e.target.date.value);
    leavingDate.setMonth(leavingDate.getMonth() - 1);

    axios
      .patch(`http://localhost:5000/members/${id}`, {
        leavingDate: leavingDate,
      })
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <th>Seat Fee</th>
            <th>Due Amount</th>
            <th>booking amount</th>
            <th>Advance</th>
            <th>Returnable</th>
            <th>Status</th>
            <th>Due pay</th>
            <th>Leaving Status</th>
            <th>Invoice</th>
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
              <>
                <tr className="text-center" key={member?._id}>
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
                  <td>{member?.monthlyPayment}</td>
                  <td>{member?.monthlyPayment * member.dueMonth}</td>
                  <td>{member?.bookingAmount}</td>
                  <td>{member?.advanceAmount}</td>
                  <td>{member?.returnableAmount}</td>
                  {/* monthly pay*/}
                  <td>
                    {member?.status === "time to pay" ? (
                      <>
                        {parseInt(member?.dueMonth) <= 0 ? (
                          <button
                            onClick={() =>
                              HandlePaymentSuccess(
                                member?._id,
                                member?.bookingDate,
                                index + 1,
                                member?.dueMonth
                              )
                            }
                            className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                          >
                            Pay
                          </button>
                        ) : (
                          <div className="flex">
                            <input
                              type="text"
                              required
                              name="recivePayment"
                              placeholder="Type here"
                              id={`recivePayment${index + 1}`}
                              className="input-sm input  rounded-none"
                            />

                            <button
                              onClick={() =>
                                HandlePaymentSuccess(
                                  member?._id,
                                  member?.bookingDate,
                                  index + 1,
                                  member?.dueMonth
                                )
                              }
                              className="btn btn-sm w-fit capitalize rounded-none bg-indigo-400 border-0 text-white"
                            >
                              Pay
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        disabled
                        className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  {/* due */}
                  <td>
                    {member?.status === "time to pay" ? (
                      <button
                        onClick={() =>
                          HandleDue(
                            member?._id,
                            member?.dueMonth,
                            member?.bookingDate
                          )
                        }
                        className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                      >
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
                  {/* checkout */}
                  <td>
                    <form
                      className="flex"
                      onSubmit={(e) => HandleLeave(e, member?._id)}
                    >
                      <input
                        type="date"
                        placeholder="booking date"
                        className="input-sm border-0 outline-0 text-slate-500 rounded-none"
                        required
                        name="date"
                      />
                      <button className="btn btn-sm  capitalize rounded-none bg-indigo-400 border-0 text-white">
                        Will go
                      </button>
                    </form>
                  </td>
                  {/* invouce print */}
                  <td>
                    <button
                      onClick={() => HandlePrintInvoice(member?._id)}
                      className="btn btn-sm w-full capitalize rounded-none bg-indigo-400 border-0 text-white"
                    >
                      Print
                    </button>
                  </td>
                  {/* invoice */}
                  <td className="hidden">
                    <Invoice memberId={memberId} setMemberId={setMemberId}></Invoice>
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllMembers;
