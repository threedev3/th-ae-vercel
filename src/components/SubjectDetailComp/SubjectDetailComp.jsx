import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { learningOutcomesImg } from "../../assets/img/images";

const SubjectDetailComp = ({ demoRef, subject, handleNavClick }) => {
  const [activeView, setActiveView] = useState("");
  // const [showFloatingTabs, setShowFloatingTabs] = useState(false);
  // const tabsRef = useRef(null);
  // const floatingTabsEnd = useRef(null);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const tabsOffsetTop = tabsRef.current?.offsetTop || 0;
  //     setShowFloatingTabs(window.scrollY >= tabsOffsetTop);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const activeSubjectData = subject.content?.[activeView] || {};
  const { description = [], learningOutcomes = [] } = activeSubjectData;
  const isGeneralView = !activeView;

  const outcomes = [
    {
      title: "Learning Outcomes",
      answer: isGeneralView
        ? subject.generalLearningOutcome
        : activeSubjectData?.learningOutcomes || [],
    },
  ];

  const renderItems = () => {
   

    return (
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 flex flex-col gap-10">
          <div className="flex flex-col gap-6 lg:max-w-[50%] max-w-full">
            <h3 className="xl:text-[36px] xl:leading-tight md:text-4xl sm:text-3xl text-[27px] lg:leading-[3.5rem] leading-8 font-extrabold text-headingColor">
              About The Course
            </h3>
            {!activeView && (
              <div className="flex flex-col gap-6">
                {subject.generalData.map((point, index) => (
                  <div key={index} className="flex flex-row gap-4">
                    <div className="sm:w-3 sm:h-3 w-3 h-3 bg-blueBtn rounded-full flex-shrink-0 mt-1.5"></div>
                    <p className="xl:text-base sm:text-sm text-sm font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeView && (
              <div className="flex flex-col gap-6 ">
                {description.map((point, index) => (
                  <div key={index} className="flex flex-row gap-4">
                    <div className="sm:w-3 sm:h-3 w-3 h-3 bg-blueBtn rounded-full flex-shrink-0 mt-1.5"></div>
                    <p className="xl:text-base sm:text-sm text-sm font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              className="text-white font-semibold py-2 px-5 bg-orangeHeading rounded-md xl:max-w-48 max-w-40 xl:text-base text-sm"
              onClick={() => handleNavClick("Demo")}
            >
              Book A Free Trial
            </button>
          </div>

          <div className="lg:block flex justify-center">
            <img
              src={subject.heroImg}
              alt=""
              className="xl:w-[450px] w-[400px] object-contain"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <div
        // ref={tabsRef}
        className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full min-h-[40vh]"
      >
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:gap-16 md:gap-12 gap-8 ">
          <div className="flex flex-row lg:flex-wrap flex-nowrap lg:justify-center justify-start items-center overflow-x-auto no-scrollbar-original sm:gap-6 gap-3">
            {Object.keys(subject.content || {}).map((curriculum, index) => (
              <motion.button
                key={index}
                onClick={() => handleViewChange(curriculum)}
                className={`sm:px-6 px-4 rounded-full sm:text-base text-xs sm:w-auto w-full sm:py-1.5 py-1 transition-all duration-300 whitespace-nowrap ${
                  curriculum === "igcse" || curriculum === "cbse"
                    ? "uppercase"
                    : "capitalize"
                } ${
                  activeView === curriculum
                    ? "bg-activeBlueBtn text-white"
                    : "bg-subjectBtn text-white"
                }`}
              >
                {curriculum.replace("-", " ")}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            <div className="">{renderItems()}</div>
          </AnimatePresence>
        </div>
      </div>

      {/* {showFloatingTabs && (
        <div
          className={`w-[100%] fixed sm:top-[89.3px] top-[81.3px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg  px-6 xl:py-4 py-3 flex xl:justify-center lg:${
            Object.keys(subject.content).length < 6
              ? "justify-center"
              : "justify-start"
          } justify-start gap-4 z-[15] overflow-x-auto no-scrollbar whitespace-nowrap touch-pan-x`}
        >
          <div className="flex justify-center items-center gap-4">
            {Object.keys(subject.content || {}).map((curriculum, index) => (
              <button
                key={index}
                onClick={() => handleViewChange(curriculum)}
                className={`sm:px-6 px-4 rounded-full sm:text-base text-xs sm:w-auto w-full xl:py-1.5 py-1 transition-all duration-300 whitespace-nowrap ${
                  curriculum === "igcse" || curriculum === "cbse"
                    ? "uppercase"
                    : "capitalize"
                } ${
                  activeView === curriculum
                    ? "bg-activeBlueBtn text-white"
                    : "bg-subjectBtn text-white"
                }`}
              >
                {curriculum.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      )} */}
      <div
        className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full bg-subjectsBg "
        // ref={floatingTabsEnd}
      >
        <div className="max-w-[1400px] mx-auto ">
          <div className="max-w-full ">
            {outcomes.map((item, index) => (
              <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 flex flex-col gap-6" key={index}>
                <div className="lg:block hidden xl:max-w-xl">
                  <img
                    src={learningOutcomesImg}
                    alt=""
                    className="xl:w-[500px] w-[450px] object-contain"
                  />
                </div>
                <div className="flex flex-col gap-6 lg:max-w-[50%] max-w-full">
                  <div className="w-full">
                    <h3 className="xl:text-[36px] xl:leading-tight md:text-4xl sm:text-3xl text-[27px] lg:leading-[3.5rem] leading-8 font-extrabold text-headingColor">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    {item.answer.map((item, index) => (
                      <div className="flex flex-row gap-4 w-full" key={index}>
                        <div className="sm:w-3 sm:h-3 w-3 h-3 bg-blueBtn rounded-full flex-shrink-0 mt-1.5"></div>
                        <p className="xl:text-base sm:text-sm text-sm font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailComp;
