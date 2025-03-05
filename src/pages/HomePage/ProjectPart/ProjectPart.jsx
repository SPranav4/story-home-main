import React from "react";
import { projectData } from "../../../components/common/data";
import ProjectCard from "../../../components/common/ProjectCard";
import SectionHeader from "../../../components/common/SectionHeader";
const ProjectPart = () => {
  return (
    <div className="my-[60px] lg:my-[95px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px] text-center">
      <SectionHeader
        title={"Follow Our Projects"}
        paragraph={
          "It is a long established fact that a reader will be distracted by the of readable content of page lookings at its layouts points."
        }
        view={"View all Projects"}
        link={"/projects"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 lg:grid-cols-2 mt-[100px]">
        {projectData?.slice(0, 4).map((e, i) => {
          return <ProjectCard e={e} key={i} />;
        })}
      </div>
    </div>
  );
};

export default ProjectPart;
