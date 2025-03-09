import React from "react";
import img1 from "../../assets/aboutImage/banner1.png";
import img2 from "../../assets/aboutImage/banner2.png";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const AboutSecondPart = () => {
  return (
    <div className="max-w-[1200px] mx-auto mb-20">
      <div className="flex flex-col justify-center items-center my-[120px] md:my-[180px] lg:my-[180px] relative">
        <div className="w-[1px] min-h-[200px] bg-[#4D5053] absolute top-0 left-5 md:left-[115px] lg:left-32"></div>
        <div className="w-[1px] min-h-[200px] bg-[#4D5053] absolute top-0 right-5 md:right-[115px] lg:right-32"></div>
        <h1 className="w-[312px] md:w-[530px] lg:w-[751px] text-2xl md:text-[29px] lg:text-[35px] text-center leading-[43px]">
          "The best interior design reflects the soul of its location. In Visakhapatnam, we create spaces that capture the rhythm of the waves and the warmth of Andhra sunshine."
        </h1>
        <p className="text-[23px] text-[#4D5053] mt-9">AD INTERIORS</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-normal items-center gap-16 lg:gap-7 mt-[140px] md:mt-[190px] lg:mt-[190px] md:mx-[35px] lg:mx-0">
        <div className="mb-[30px] w-[360px] mx-auto md:mx-0 lg:mx-0 lg:w-[452px]">
          <h1 className="text-[40px] lg:text-[50px] text-center md:text-start lg:text-start">
            Our Coastal Approach
          </h1>
          <p className="text-[18px] lg:text-[22px] text-[#4D5053] text-center md:text-start lg:text-start">
            We create interiors that celebrate Visakhapatnam's unique coastal character. Our design philosophy embraces the natural beauty of the Bay of Bengal while addressing the practical challenges of seaside living. We blend contemporary aesthetics with elements that honor Andhra Pradesh's rich cultural heritage.
          </p>
          <Link
            to="/services"
            className="flex justify-center lg:justify-start md:justify-start">
            <Button title={"Our Design Services"} />
          </Link>
        </div>
        <div className="h-[300px] md:h-[400px] lg:h-[500px] rounded-tl-[130px] mx-[20px] md:mx-0 lg:mx-0">
          <img
            src={img1}
            alt="Coastal-inspired interior design in Visakhapatnam"
            className="h-full w-full object-fill rounded-tl-[130px]"
          />
        </div>
      </div>
      <div className="md:mx-[35px] lg:mx-0 grid-cols-1 grid md:grid-cols-2 lg:grid-cols-2 md:justify-normal lg:justify-normal items-center gap-20 md:gap-10 lg:gap-10 my-[190px]">
        <div className="h-[300px] md:h-[400px] lg:h-[500px] mx-[20px] md:mx-0 lg:mx-0 rounded-tr-[130px]">
          <img
            src={img2}
            alt="Completed interior design project in Visakhapatnam"
            className="h-full w-full object-fill rounded-tr-[130px]"
          />
        </div>
        <div className="mb-[30px] w-[360px] mx-auto md:mx-0 lg:mx-0 lg:w-[452px]">
          <h1 className="text-[40px] lg:text-[50px] text-center md:text-start lg:text-start">
            Transforming Vizag Homes
          </h1>
          <p className="text-[18px] lg:text-[22px] text-[#4D5053] text-center md:text-start lg:text-start">
            Since 2024, we've transformed homes across Visakhapatnam, from seafront apartments in Rushikonda to heritage properties in the Old Town. Our portfolio showcases interiors that not only look beautiful but also perform flawlessly in our coastal environment, enhancing the way Vizag families live, entertain, and connect with our city's natural beauty.
          </p>
          <Link
            to={"/projects"}
            className="flex justify-center lg:justify-start md:justify-start">
            <Button title={"View Our Projects"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSecondPart;