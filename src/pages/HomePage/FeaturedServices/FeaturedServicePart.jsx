import React from "react";
import { MdArrowForward } from "react-icons/md";
import { serviceData } from "../../../components/common/data";
import { Link } from "react-router-dom";
import ServiceCard from "../../../components/common/ServiceCard";
const FeaturedServicePart = () => {
  console.log("serviceData", serviceData);
  return (
    <div
      className="my-[60px] lg:my-[140px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center items-center gap-4 lg:gap-11"
      id="service">
      {serviceData?.slice(1, 4).map((e, i) => (
        <ServiceCard e={e} key={i} />
      ))}
    </div>
  );
};

export default FeaturedServicePart;
