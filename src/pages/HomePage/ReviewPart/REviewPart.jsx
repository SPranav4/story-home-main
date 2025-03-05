import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { reviewsData } from "../../../components/common/data";
import Star from "../../../components/common/Star";
const REviewPart = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-[360px] md:max-w-[720px] md:h-[380px] lg:max-w-[1200px] h-[350px] lg:h-[650px] mx-auto my-[85px] lg:my-[130px] rounded-[35px] bg-gradient-to-tl from-[#f6caaa54] to-[#df803c]">
      <h1 className="text-[25px] lg:text-[50px] font-normal leading-8 lg:leading-[70px] text-white text-center pt-6 lg:pt-16">
        What the People Thinks
        <br /> About Us
      </h1>
      <div className="w-3/4 m-auto">
        <div className="mt-4 md:mt-10 lg:mt-20">
          <Slider {...settings}>
            {reviewsData.map((d) => (
              <div key={d.name} className="bg-white text-black rounded-xl">
                <div className="flex justify-center items-center mt-5 gap-2">
                  {" "}
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={d.img} alt={d.user} />
                    </div>
                  </div>
                  <div>
                    {" "}
                    <h1 className="text-2xl font-normal tracking-wider">
                      {d.user}
                    </h1>
                    <p className="text-[17px] font-normal mt-[-4px] text-[#4D5053]">
                      {d.deignation}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <Star ratingPoint={d.rating} />
                  <p className="text-center text-[#4D5053] tracking-wider">
                    {d.comment}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default REviewPart;
