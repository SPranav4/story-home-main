import React from "react";
import { Link } from "react-router-dom";

const SectionHeader = ({ title, paragraph, view, link }) => {
  return (
    <div>
      <h1 className="text-[27px] lg:text-[43px] text-center font-normal">
        {title}
      </h1>
      <p className="text-[18px] lg:text-[22px] font-normal md:leading-6 lg:leading-[30px] text-[#4D5053] w-[340px] lg:w-[670px] mx-auto text-center">
        {paragraph}
      </p>
      <Link to={link}>
        <p className="text-[18px] tracking-widest mt-3 text-blue-500 underline cursor-pointer">
          {view}
        </p>
      </Link>
    </div>
  );
};

export default SectionHeader;
