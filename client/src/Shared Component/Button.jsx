import React from "react";

const Button = ({label}) => {
  return (
    <button className="btn capitalize btn-primary rounded-none bg-indigo-500 border-0 text-white">
     {label}
    </button>
  );
};

export default Button;
