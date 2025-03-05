import React, { useEffect, useState } from "react";
import CommonBanner from "../../components/common/CommonBanner";
import projectBanner from "../../assets/projectbanner.jpg";
import { projectData } from "../../components/common/data";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/common/ProjectCard";
const Projects = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [filteredServices, setFilteredServices] = useState(projectData);
  const [ratingFilter, setRatingFilter] = useState("all");

  //filter functionality
  useEffect(() => {
    const filtered = projectData?.filter((service) => {
      let matchesRating;
      if (ratingFilter === "all") {
        matchesRating = true;
      } else if (ratingFilter === "4") {
        matchesRating = service?.num <= 4;
      } else if (ratingFilter === "3") {
        matchesRating = service?.num > 4;
      } else if (ratingFilter === "2") {
        matchesRating = service?.num < 3;
      }

      return matchesRating;
    });
    setFilteredServices(filtered);
  }, [projectData, ratingFilter]);

  //filter handle function
  const handleRatingFilterChange = (e) => {
    const selectedRating = e.target.value;
    setRatingFilter(selectedRating);
  };

  const Bedroom = filteredServices?.filter((item) => item.type === "Bedroom");
  const Kitchen = filteredServices?.filter((item) => item.type === "Kitchen");
  const Living = filteredServices?.filter((item) => item.type === "Living");
  const BathRoom = filteredServices?.filter((item) => item.type === "Bathroom");
  const Wall = filteredServices?.filter((item) => item.type === "Wall");

  const renderFilteredServices = (filteredItems) => {
    if (filteredItems && filteredItems.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[50px]">
          {filteredItems.map((item, index) => (
            <ProjectCard e={item} key={index} />
          ))}
        </div>
      );
    } else {
      return (
        <p className="text-red-500 text-xl flex flex-col justify-center items-center my-20 gap-4">
          No products available for the selected rating or search.
        </p>
      );
    }
  };
  return (
    <div>
      <CommonBanner
        title={"Our Project"}
        bread1={<Link to = '/' className = 'hover:text-[#d6763e] transition-colors' >Home</Link>}
        bread2={"Projects"}
        bannerImage={projectBanner}
      />
      <div className="max-w-[1200px] mx-auto mb-[200px]">
        <div className="hidden md:flex md:mx-auto lg:flex justify-center items-center gap-5 w-[880px] lg:mx-auto  mt-[90px] mb-[60px] border border-[#C16828] rounded-[20px]">
          <p
            className={
              toggleState == 1
                ? "bg-[#C16828] text-white text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center"
                : " text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-[#C16828]"
            }
            onClick={() => toggleTab(1)}
          >
            Bedroom
          </p>
          <p
            className={
              toggleState == 2
                ? "bg-[#C16828] text-white text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center"
                : "text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-[#C16828]"
            }
            onClick={() => toggleTab(2)}
          >
            Kitchen
          </p>
          <p
            className={
              toggleState == 3
                ? "bg-[#C16828] text-white text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-white"
                : "text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-[#C16828]"
            }
            onClick={() => toggleTab(3)}
          >
            Living
          </p>
          <p
            className={
              toggleState == 4
                ? "bg-[#C16828] text-white text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-white"
                : "text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-[#C16828]"
            }
            onClick={() => toggleTab(4)}
          >
            Bathroom
          </p>
          <p
            className={
              toggleState == 5
                ? "bg-[#C16828] text-white text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-white"
                : "text-[18px] font-semibold w-[219px] h-[75px] rounded-[18px] cursor-pointer hover:shadow-md flex justify-center items-center hover:text-[#C16828]"
            }
            onClick={() => toggleTab(5)}
          >
            Wall
          </p>
        </div>

        <div className="md:mt-[90px] lg:mt-0">
          {toggleState === 1 && renderFilteredServices(Bedroom)}
          {toggleState === 2 && renderFilteredServices(Kitchen)}
          {toggleState === 3 && renderFilteredServices(Living)}
          {toggleState === 4 && renderFilteredServices(BathRoom)}
          {toggleState === 5 && renderFilteredServices(Wall)}
        </div>
      </div>
    </div>
  );
};

export default Projects;
