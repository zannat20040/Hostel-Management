import React, { useEffect,  useState } from "react";
import { useReactToPrint } from "react-to-print";

import axios from "axios";
const Invoice = ({ memberId ,setMemberId}) => {
  const [invoiceData, setInvoiceData] = useState([]);
  useEffect(() => {
    if (memberId) {
      console.log("useEffect", memberId);
      axios
        .get(`http://localhost:5000/members/${memberId}`)
        .then((res) => {
          console.log("useEffect", res.data);
          setInvoiceData(res.data);
          setMemberId(null)
        })
        .catch((err) => console.log(err));
    }
  }, [memberId]);

  const HandlePrint = useReactToPrint({
    content: () => document.getElementById(`componentRef${memberId}`),
  });
  HandlePrint();

  return (
    <div className="grid grid-cols-1 min-h-screen bg-base-200 px-6 py-20">
      <div className="card rounded-none  container mx-auto bg-white gap-5 justify-between">
        <div
          id={`componentRef${memberId}`}
          className="card-body p-10  bg-base-100"
        >
          <div className="grid grid-cols-2 gap-3 justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-indigo-500">
                Nissa Girls Hostel
              </h1>
              <p className="text-xl font-semibold">
                Invoice id. {invoiceData._id}{" "}
              </p>
              <p className="mt-5">Invoice date : </p>
              <p className="">Address : Mipur 2, dhaka, bd </p>
              <span className="mt-">Phone Number: 01600988643 </span> <br />
              <span className="mt-">WhatsApp Number: 01600988643 </span>
            </div>
            <div className="flex justify-end">
              <figure className="border-gray-400  border-2 w-52 h-52">
                <img
                  src={invoiceData?.photo}
                  alt=""
                  className="h-full w-full"
                />
              </figure>
            </div>
          </div>

          {/* guest details */}
          <h1 className=" py-1 px-5 bg-indigo-300  text-black font-medium">
            Guest details
          </h1>

          <div className=" grid grid-cols-6 gap-6">
            <div className="col-span-2">
              <p className="font-bold text-base  ">Name</p>
              <p className="capitalize"> {invoiceData?.name}</p>
            </div>

            <div>
              <p className="font-bold text-base">Contact No.</p>
              <p> {invoiceData?.phoneNumber}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold text-base  ">Address</p>
              <p className="capitalize"> {invoiceData?.address}</p>
            </div>
            <div>
              <p className="font-bold text-base ">Age</p>
              <p className="capitalize"> {invoiceData?.age}</p>
            </div>
          </div>

          {/* booking details */}
          <h1 className="py-1 px-5 bg-indigo-300  text-black font-medium">
            Booking details
          </h1>

          <div className="  grid grid-cols-4 gap-4">
            <div>
              <p className="font-bold text-base ">Arrival Date</p>
              <p className="capitalize"> {invoiceData?.bookingDate}</p>
            </div>
            <div>
              <p className="font-bold text-base">Leaving Date</p>
              <p> {invoiceData?.leavingDate?.split("T")[0]}</p>
            </div>
            <div>
              <div>
                <p className=" text-base ">
                  <span className="font-bold">Room : </span>{" "}
                  {invoiceData?.monthlyPayment === "4000"
                    ? "Dining"
                    : invoiceData?.monthlyPayment === "4200"
                    ? "Master"
                    : "Bed room"}
                </p>
              </div>
              <div>
                <p className=" text-base ">
                  <span className="font-bold">Seat : </span>
                  {invoiceData?.seat}
                </p>
              </div>
            </div>
          </div>
          {/* <div>
            <p className="font-bold text-base">Provided Item : </p>
            <div className="form-control grid grid-cols-7 gap-2 w-full ">
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mr-3 rounded-none "
                />
                <span className="label-text">Bed</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">Pureit</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">Cusion</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">fridge</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">Bed sheet</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">
                  Keys (Main door, Almirah, Room)
                </span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">Almirah</span>
              </label>
              <label className="cursor-pointer label flex justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm  mr-3 rounded-none "
                />
                <span className="label-text">Gas</span>
              </label>
            </div>
          </div> */}

          {/* Payment details */}
          <h1 className="py-1 px-5 bg-indigo-300  text-black font-medium">
            Payment details
          </h1>

          <div className="">
            <div>
              <p className=" text-base ">
                <span className="font-bold">Seat fee : </span>
                {invoiceData?.monthlyPayment} Tk
              </p>
              <p className=" text-base ">
                <span className="font-bold">Booking fee : </span>
                {invoiceData?.bookingAmount} Tk
              </p>
              <p className=" text-base ">
                <span className="font-bold"> Advance amount : </span>
                {invoiceData?.advanceAmount} Tk
              </p>
              <p className=" text-base ">
                <span className="font-bold"> Returnable amount : </span>
                {invoiceData?.advanceAmount} Tk
              </p>
            </div>
          </div>

          {/* Terms & condition details */}
          <h1 className="py-1 px-5 bg-indigo-300  text-black font-medium">
            Terms & Conditions
          </h1>
          <div className="flex gap-3  items-center">
            <input
              type="checkbox"
              className="checkbox rounded-none checkbox-sm"
            />
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              praesentium placeat? Ea magnam repudiandae facilis fugit
              doloremque totam deleniti! Nostrum corrupti, in aspernatur sint
              suscipit id autem eum nisi est.
            </span>
          </div>
          <div className="flex gap-3  items-center">
            <input
              type="checkbox"
              className="checkbox rounded-none checkbox-sm"
            />
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              praesentium placeat? Ea magnam repudiandae facilis fugit
              doloremque totam deleniti! Nostrum corrupti, in aspernatur sint
              suscipit id autem eum nisi est.
            </span>
          </div>
          <div className="flex gap-3  items-center">
            <input
              type="checkbox"
              className="checkbox rounded-none checkbox-sm"
            />
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              praesentium placeat? Ea magnam repudiandae facilis fugit
              doloremque totam deleniti! Nostrum corrupti, in aspernatur sint
              suscipit id autem eum nisi est.
            </span>
          </div>

          {/* Signature */}
          <div className="mt-20 grid grid-cols-2 justify-between">
            <div className="">
              <hr className="w-36 mb-3" />
              <p>Signature of Hostel Authority</p>
            </div>
            <div className="flex flex-col items-end">
              <hr className="w-72  mb-3" />
              <p>Signature of Guest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
