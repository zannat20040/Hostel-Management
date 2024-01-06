import React from "react";
import Button from "../../Shared Component/Button";
import img from '../../assets/desktop-wallpaper-white-backgrounds-plain-https-www-pop-white-background-white-thumbnail.jpg'

const NewMemberLayout = ({ HandleAddMember }) => {
  return (
    <div className="hero min-h-screen bg-base-200 px-6 ">
      <div className="card my-20 rounded-none  gap-5 justify-between">
        {/* form start */}
        <form
          className="card-body p-20  bg-base-100  shadow-2xl"
          onSubmit={HandleAddMember}
        >
          {/* name & booking date */}
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
          {/* age & phone number */}
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
          {/* image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full rounded-none"
              name="photo"
            />
          </div>
          {/* address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Permanent address</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full rounded-none"
              name="address"
            />
          </div>
          {/* package & seat */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="form-control">
                <span className="label-text">Select package</span>
              </label>
              <select
                className="select select-bordered rounded-none"
                name="package"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value={4000}>Dining</option>
                <option value={4200}>Master</option>
                <option value={3800}>Bed room</option>
              </select>
            </div>
            <div className="form-control">
              <label className="form-control">
                <span className="label-text">Select seat number</span>
              </label>
              <select
                className="select select-bordered rounded-none"
                name="seat"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
                <option value="S7">S7</option>
                <option value="S8">S8</option>
                <option value="S10">S10</option>
              </select>
            </div>
          </div>
          {/* booking amount & Advance payment */}
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
          {/* button */}
          <div className="form-control mt-6">
            <Button label={"add this member"}></Button>
          </div>
        </form>
        {/* <div className="bg-white p-6"></div> */}
      </div>
    </div>
  );
};

export default NewMemberLayout;
