import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const ServiceCard = ({ e }) => {
  return (
    <div className="text-center px-2 lg:px-4 py-4 lg:py-6 group hover:bg-[#f5e3d88a] hover:rounded-[15px] hover:text-[#d6763e]">
      <h1 className="text-2xl tracking-[0.03rem]">{e?.title}</h1>

      {e.paragraph?.length > 70 ? (
        <p className="md:text-[18px] text-xl text-[#4D5053] group-hover:text-[#d6763e] mt-1 lg:mt-[15px]">
          {e.paragraph.slice(0, 70) + "..."}
        </p>
      ) : (
        <p className="md:text-[18px] text-xl text-[#4D5053] group-hover:text-[#d6763e] mt-1 lg:mt-[15px]">
          {e.paragraph}
        </p>
      )}

      <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
        {" "}
        <button className="rounded-[10px] py-[10px] px-[20px] lg:py-[10px] lg:px-[20px] flex justify-center items-center gap-1 text-[#4D5053] hover:bg-[#d6763e] hover:text-white mt-2 lg:mt-8 text-xl mx-auto drop-shadow-xl bg-transparent tracking-wide border-b-2 border-[#d6763e] hover:border-[#d6763e] shadow-md">
          <p className="text-[18px] font-semibold">Read More</p>{" "}
          <MdArrowForward />
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;
