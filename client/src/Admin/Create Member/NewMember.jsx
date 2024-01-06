import React from "react";
import NewMemberLayout from "./NewMemberLayout";
import axios from 'axios'
import toast from "react-hot-toast";
import { imgUpload } from "../../Shared Component/imgUpload";

const NewMember = () => {
  
      //handle new member add  
    const HandleAddMember= async(e)=>{
        e.preventDefault()

        // get value
        const form = e.target
        const name = form.name.value;
        const age = form.age.value;
        const number = form.number.value;
        const address = form.address.value;
        const bookingDate = form.date.value;
        const roomPackage = form.package.value;
        const seat = form.seat.value;
        const bookingpay = form.bookingpay.value;
        const advancepay = form.advancepay.value;
        const image = form.photo.files[0];
        const photo = await imgUpload(image);

        
        // data create
        const newMember = {
            name: name,
            age: age,
            phoneNumber: number,
            bookingDate:bookingDate,
            photo:photo,
            address:address,
            monthlyPayment:roomPackage,
            seat:seat,
            bookingAmount: bookingpay,
            advanceAmount: advancepay,
            status:'running',
            dueStatus:'no due',
            dueMonth: 0,
            leavingDate: 'null',
        }

        // post data in DB
        axios.post('http://localhost:5000/members', newMember)
        .then(res=>{
            if(res.data.insertedId){
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
    <NewMemberLayout HandleAddMember={HandleAddMember} ></NewMemberLayout>
  );
};

export default NewMember;
