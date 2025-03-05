import React from "react";
import dotImage from "../../assets/Dot.png";
import { Link } from "react-router-dom";

const CommonBanner = ({ title, bread1, bread2, bannerImage }) => {
  return (
    <div
      className="hero h-[300px] bg-fixed"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}>
      <div className="hero-overlay bg-opacity-30"></div>

      <h1 className="font-medium text-[25px] lg:text-[70px] text-center text-white">
        {title}
      </h1>
      <div className="text-[16px] breadcrumbs mt-32 text-white">
        <ul>
          <li>
            <Link to={"/home"}>{bread1}</Link>
          </li>
          <li>
            <a>{bread2}</a>
          </li>
        </ul>
      </div>

      {/* dot-image */}
      <div className="absolute lg:top-[180px] top-44 right-9 lg:right-[400px]">
        <img
          src={dotImage}
          alt="white-dot-image"
          className="animate-pulse rotate-[130deg] lg:rotate-45"
        />
      </div>
    </div>
  );
};

export default CommonBanner;
