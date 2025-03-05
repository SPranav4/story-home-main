import React from "react";
import heroBanner from "../../../assets/heroBanner.png";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="max-w-[360px] md:max-w-[720px] md:h-[380px] lg:max-w-[1200px] h-[310px] lg:h-[650px] mx-auto mt-[35px] lg:mt-[50px] text-white relative rounded-tl-[100px] rounded-br-[100px] bg-gradient-to-tl from-gray-500 to-[#895531]">
      <img
        src={heroBanner}
        alt=""
        className="h-full w-full object-fill rounded-tl-[100px] rounded-br-[100px] absolute mix-blend-overlay"
      />
      <div className="absolute top-10 left-10 md:top-20 md:left-20 lg:top-40 lg:left-32">
        <h1 className="text-[27px] lg:text-[65px] font-normal leading-8 lg:leading-[70px] w-[300px] lg:w-[700px]">
          Let's make your <br /> home beautiful together
        </h1>
        <p className="text-[18px] lg:text-[22px] font-medium w-[310px] md:leading-6 lg:leading-[30px] lg:w-[447px] mt-3">
        Beyond interior design, we craft experiences. Turn your space into a reflection of who you are.
        </p>
        
        <Link to={"/contact"}>
            {" "}
            <Button title={"Start Your Free Consultation"} />
          </Link>
      </div>
    </div>
  );
};

export default Banner;
