import React from "react";

const CustomButton = ({ text }) => {
  return (
    <button className="bg-orangeHeading sm:py-1.5 sm:px-6 py-1.5 px-4 text-white rounded-full sm:text-base text-sm ">
      {text}
    </button>
  );
};

export default CustomButton;
