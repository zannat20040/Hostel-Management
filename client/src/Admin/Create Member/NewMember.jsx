import React from "react";
import NewMemberLayout from "./NewMemberLayout";
import axios from 'axios'
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const NewMember = () => {

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

      
    const HandleAddMember=(e)=>{
        e.preventDefault()

        const form = e.target
        const name = form.name.value;
        const age = form.age.value;
        const number = form.number.value;
        const bookingDate = form.date.value;
        const roomPackage = form.package.value;
        const bookingpay = form.bookingpay.value;
        const advancepay = form.advancepay.value;

        const newMember = {
            name: name,
            age: age,
            phoneNumber: number,
            bookingDate:bookingDate,
            monthlyPayment:roomPackage,
            bookingAmount: bookingpay,
            advanceAmount: advancepay,
            status:'running',
            dueStatus:'no due',
            dueMonth: 1,
            leavingDate: 'null',
        }


        axios.post('http://localhost:5000/members', newMember)
        .then(res=>{
            if(res.data.insertedId){
                toast.success('A new girl admitted successfully')
                refetch()
            }
            else{
                toast.error(res.data.message)
            }
        })
        .catch(err=>{
            console.log(err)
        })


    }
  return (
    <NewMemberLayout HandleAddMember={HandleAddMember} members={members}></NewMemberLayout>
  );
};

export default NewMember;
