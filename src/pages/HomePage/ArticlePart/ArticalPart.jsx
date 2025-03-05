import React from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import { articleData } from "../../../components/common/data";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
const ArticalPart = () => {
  return (
    <div className="my-[60px] lg:my-[95px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px] text-center">
      <SectionHeader
        title={"Articles & News"}
        paragraph={
          "Discover the latest trends, insights, and inspirations in interior design. Stay updated with expert tips, innovative ideas, and creative solutions to transform your spaces."
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:grid-cols-3 mt-[100px]">
        {articleData?.slice(0, 4).map((e, i) => {
          return (
            <div className="h-[480px] border rounded-[20px] p-3">
              <div className=" h-[300px] w-full rounded-[16px] overflow-hidden">
                <img
                  src={e.img}
                  alt=""
                  className="h-full w-full object-fill rounded-[16px] hover:scale-125 transition-all duration-500 cursor-pointer"
                />
              </div>
              <h1 className="text-2xl text-start mt-2">{e.title}</h1>
              <div className="flex justify-between items-center mt-10">
                <p>{e.date}</p>
                <Link to={`/article/${e.id}`}>
                  <div class="box">
                    <div class="studio-button2">
                      <div class="studio-button-icon">
                        <IoIosArrowForward className="text-2xl" />
                      </div>
                      <div class="studio-button-label">View Details</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticalPart;
