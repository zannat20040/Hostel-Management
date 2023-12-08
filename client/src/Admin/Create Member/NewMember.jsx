import React from "react";
import NewMemberLayout from "./NewMemberLayout";
import axios from 'axios'

const NewMember = () => {
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
        }

        console.log(newMember)

        axios.post('/members', newMember)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })


    }
  return (
    <NewMemberLayout HandleAddMember={HandleAddMember}></NewMemberLayout>
  );
};

export default NewMember;
