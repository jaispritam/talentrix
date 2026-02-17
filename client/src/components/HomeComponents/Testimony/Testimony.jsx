import React from "react";
import userImg from "../../../assets/images/foundedImg.png";
import { BsPlayFill } from "react-icons/bs";

const Testimony = ({ item }) => {
  return (
    <div className="relative inline-block cursor-pointer w-full lg:mx-4 p-4 pt-0">
      <div className="w-full surface-card p-4 sm:p-6 flex items-start lg:items-center flex-col lg:flex-row gap-7">
        <div className="w-full lg:w-[40%] relative">
          <img src={userImg} alt={item.title} className="w-full rounded-lg border border-borderSubtle" />
          <span className="absolute inset-0 flex items-center justify-center text-white">
            <span className="bg-black/50 rounded-full flex items-center w-[60px] h-[60px] justify-center cursor-pointer border border-white/20">
              <BsPlayFill size={52} />
            </span>
          </span>
        </div>
        <div className="flex flex-col items-start gap-4 w-full lg:w-[60%]">
          <h2 className="sm:text-xl text-base tracking-wide font-semibold text-textMuted">{item.title} |</h2>
          <p className="lg:text-3xl text-xl w-full lg:max-w-[670px] whitespace-normal text-textPrimary">
            <i>{item.details}</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
