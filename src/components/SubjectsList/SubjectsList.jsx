import React from "react";
import { subjectsOffering } from "../../data/data";
import SubjectsCard from "../SubjectsCard/SubjectsCard";

const SubjectsList = ({ demoRef, handleNavClick }) => {
  return (
    <div className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full bg-subjectsBg">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-20 gap-8 ">
        <div className="grid xl:grid-cols-4 xl:gap-6 lg:grid-cols-3 lg:gap-6 min-[646px]:grid-cols-2 md:gap-6 grid-cols-1 gap-2 place-items-center">
          {subjectsOffering.map((item, index) => (
            <SubjectsCard
              item={item}
              key={index}
              demoRef={demoRef}
              handleNavClick={handleNavClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
