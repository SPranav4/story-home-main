import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectData } from "../../components/common/data";
import detailsBanner from "../../assets/projectImage/banner.jpg";
import CommonBanner from "../../components/common/CommonBanner";
import { MdSearch } from "react-icons/md";
const ProjectDetails = () => {
  const { id } = useParams();
  const [idData, setIdData] = useState([]);

  useEffect(() => {
    setIdData(projectData?.filter((e) => e.id == id));
  }, [projectData]);

  console.log("idData", idData);

  return (
    <div>
      <CommonBanner
        title={"Projects Details"}
        bannerImage={detailsBanner}
        bread1={"home"}
        bread2={"ProjectDetails"}
      />
      <div className="mt-[100px] mx-auto max-w-[350px] lg:max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10">
          <div>
            <h1 className="text-[35px] text-center lg:text-start lg:text-[40px]">
              {idData[0]?.title}
            </h1>
            <p className="mt-2 text-justify text-[#4D5053] text-[22px]">
              {idData[0]?.passage}
            </p>
          </div>
          <div className="w-[350px] lg:w-[1200px] h-[341px] lg:h-[561px] relative">
            <img
              src={idData[0]?.img}
              alt=""
              className="h-full w-full object-fill rounded-[100px]"
            />
            <div className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px] rounded-full flex justify-center items-center bg-white hover:bg-[#C16828] text-[#C16828] hover:text-white text-xl lg:mx-0 drop-shadow-xl overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out absolute top-32 lg:top-52 left-[50%]">
              <MdSearch className="h-[32px] w-[32px] " />
            </div>
          </div>

          <div>
            <div className="flex justify-start">
              <h1 className="text-[22px]"> Client: </h1>
              <p className="ml-2 text-[22px]">{idData[0]?.client}</p>
            </div>
            <div className="flex justify-start">
              <h1 className="text-[22px]"> Catagory: </h1>
              <p className="ml-2 text-[22px]">{idData[0]?.Category}</p>
            </div>
            <div className="flex justify-start">
              <h1 className="text-[22px]"> Date: </h1>
              <p className="ml-2 text-[22px]">{idData[0]?.date}</p>
            </div>
            <div className="flex justify-start">
              <h1 className="text-[22px]"> Price: </h1>
              <p className="ml-2 text-[22px]">${idData[0]?.price}</p>
            </div>
            <div className="flex justify-start flex-wrap">
              <h1 className="text-[22px]"> Tags : </h1>
              {idData[0]?.tags?.map((i) => {
                return (
                  <p className="ml-2 mt-2 text-[17px] bg-[#C16828] rounded-full px-3 text-white">
                    {i.name}
                  </p>
                );
              })}
            </div>
            <div className="flex justify-start">
              <h1 className="text-[22px]"> Rating : </h1>
              <p className="ml-2 text-[22px]">{idData[0]?.rating}</p>
            </div>
            <div className="flex justify-start mb-20">
              <h1 className="text-[22px]"> Review: </h1>{" "}
              <span className="ml-2 text-[22px]">
                {idData[0]?.cient_reviews}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
