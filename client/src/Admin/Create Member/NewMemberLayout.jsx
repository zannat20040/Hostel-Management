import React from 'react';
import Button from '../../Shared Component/Button';

const NewMemberLayout = ({HandleAddMember,members}) => {

    return (
        <div className="hero min-h-screen bg-base-200 px-6 ">
        <div className="card  rounded-none  grid grid-cols-2 gap-5 justify-between">
      
          <form className="card-body bg-base-100  shadow-2xl" onSubmit={HandleAddMember}>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered rounded-none"
                  required
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Booking date</span>
                </label>
                <input
                  type="date"
                  placeholder="booking date"
                  className="input input-bordered rounded-none"
                  required
                  name="date"
                />{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="age"
                  className="input input-bordered rounded-none"
                  required
                  name="age"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="number"
                  className="input input-bordered rounded-none"
                  required
                  name="number"
                />
              </div>
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Profile image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-none"
                name="photo"
              />
            </div> */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Select package</span>
              </div>
              <select
                className="select select-bordered rounded-none"
                name="package"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value="4000">Dining</option>
                <option value="4200">Master</option>
                <option value="4000">Bed room</option>
              </select>
             
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Booking amount</span>
                </label>
                <input
                  type="number"
                  placeholder="booking amount"
                  className="input input-bordered rounded-none"
                  required
                  name="bookingpay"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Advance payment</span>
                </label>
                <input
                  type="number"
                  placeholder="advance payment amount"
                  className="input input-bordered rounded-none"
                  required
                  name="advancepay"
                />
              </div>
            </div>
  
            <div className="form-control mt-6">
              <Button label={"add this member"}></Button>
            </div>
          </form>
          <div className='overflow-y-auto'>
          <table className="table bg-slate-100 shadow-lg rounded-none">
        {/* head */}
        <thead>
          <tr className=" bg-slate-400 text-white text-center">
            <th className="py-3">No.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Seat Fee</th>
            <th>Leaving Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            members?.map((member, index) => (
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
                <td>{member?.monthlyPayment}</td>
                <td>
                  <form className="flex" onSubmit={(e) => HandleLeave(e,member?._id)}>
                  <input
                      type="date"
                      placeholder="booking date"
                      className="input-sm border-0 outline-0 text-slate-500 rounded-none"
                      required
                      name="date"
                    />
                    <button
                    className="btn btn-sm  capitalize rounded-none bg-indigo-400 border-0 text-white"
                  >
                    Will go
                  </button>
                  </form>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
          </div>
        </div>
      </div>
    );
};

export default NewMemberLayout;