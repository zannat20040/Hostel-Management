import React from "react";
import NewMemberLayout from "./NewMemberLayout";
import axios from 'axios'
import toast from "react-hot-toast";

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

        axios.post('http://localhost:5000/members', newMember)
        .then(res=>{
            if(res.data.insertedId){
                console.log('')
                toast.success('A new girl admitted successfully')
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
    <NewMemberLayout HandleAddMember={HandleAddMember}></NewMemberLayout>
  );
};

export default NewMember;
