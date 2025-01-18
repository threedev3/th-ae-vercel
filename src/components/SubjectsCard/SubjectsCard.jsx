import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SubjectsCard = ({ item, handleNavClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubjectClick = () => {
    window.location.href = `/${item.slug}`
  };

  return (
    <div
      className="cursor-pointer mx-1 min-[1320px]:min-h-[260px] xl:min-h-[280px] lg:min-h-[240px] md:min-h-[220px] sm:min-h-[250px] min-[450px]:min-h-[200px] min-[346px]:min-h-[220px] min-h-[240px] sm:mb-0 mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col justify-between gap-4 lg:max-w-[300px] max-w-[400px] md:p-0 sm:p-3 p-0 min-[600px]:mx-0 mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center lg:gap-4 gap-2 min-h-16">
            <div
              className={`${item.bg} w-12 h-12 rounded-full flex-shrink-0 flex justify-center items-center`}
            >
              <img src={item.img} alt="" className="w-6 object-contain" />
            </div>
            <div>
              <h3 className="text-headingColor md:text-[21px] text-xl">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="text-headingColor xl:text-base text-sm lg:min-h-24 md:min-h-24 sm:min-h-[130px] min-[346px]:min-h-[100px] min-h-[70px] font-medium">
          {item.description}
        </div>
        <div className="lg:block hidden">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative inline-block min-[680px]:py-1 py-1 min-[680px]:px-2 px-2 border-2 border-orangeHeading min-[877px]:text-sm min-[840px]:text-xs sm:text-xs min-[420px]:text-sm text-xs font-semibold custom-border"
                  onClick={handleSubjectClick}
                >
                  Read More
                </div>
                <div
                  className="relative inline-block min-[680px]:py-1 py-1 min-[680px]:px-2 px-2 border-2 border-orangeHeading min-[877px]:text-sm min-[840px]:text-xs sm:text-xs min-[420px]:text-sm text-xs font-semibold custom-border"
                  onClick={() => handleNavClick("Demo")}
                >
                  Book A Free Demo
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:hidden block">
          <div className="flex gap-3">
            <div
              className="relative inline-block min-[680px]:py-1 py-1 min-[680px]:px-2 px-2 border-2 border-orangeHeading min-[877px]:text-sm min-[840px]:text-xs sm:text-xs min-[420px]:text-sm text-xs font-semibold custom-border"
              onClick={handleSubjectClick}
            >
              Read More
            </div>
            <div
              className="relative inline-block min-[680px]:py-1 py-1 min-[680px]:px-2 px-2 border-2 border-orangeHeading min-[877px]:text-sm min-[840px]:text-xs sm:text-xs min-[420px]:text-sm text-xs font-semibold custom-border"
              onClick={() => handleNavClick("Demo")}
            >
              Book A Free Demo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsCard;
