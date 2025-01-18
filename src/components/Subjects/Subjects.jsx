import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomButton from "../CustomButton/CustomButton";
import { motion, AnimatePresence } from "framer-motion";
import { subjectsOffering } from "../../data/data";
// import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Subjects = () => {
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [visibleSubjects, setVisibleSubjects] = useState(8);
  const [isMobile, setIsMobile] = useState(false);
  // const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleToggleSubjects = () => {
    setShowAllSubjects(!showAllSubjects);
    setVisibleSubjects(subjectsOffering.length);
  };

  // const navigateAllSubjects = () => {
  //   navigate("/courses");
  //   scrollToTop();
  // };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setVisibleSubjects(8);
      } else {
        setVisibleSubjects(6);
      }

      setIsMobile(width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 546,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isPopular, setIsPopular] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPopular((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:py-20 py-12 sm:px-12 px-6 max-w-full relative bg-heroBg">
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col justify-center sm:gap-12 gap-8">
        <div className="flex flex-col sm:gap-6 gap-4 items-center text-headingColor max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.h3
              // key={isPopular ? "Popular" : "In-Demand"}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center gap-3 text-headingColor"
            >
              {/* {isPopular ? "Popular Subjects" : "In-Demand Subjects"} */}
              Popular Subjects
            </motion.h3>
          </AnimatePresence>
          <p className="xl:text-lg sm:text-lg text-base text-center max-w-4xl mx-auto">
            Our expert tutors cover all subjects across major curricula. Get
            personalized support to overcome academic challenges and excel in
            your studies.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <div>
            <div className="xl:grid xl:grid-cols-4 xl:gap-10 lg:grid lg:grid-cols-3 lg:gap-10 hidden ">
              {subjectsOffering.slice(0, visibleSubjects).map((item, index) => (
                <motion.a
                  key={index}
                  className={`p-3 rounded-[30px] md:shadow-lg shadow-md flex items-center transition-shadow duration-300 bg-white cursor-pointer h-[120px] lg:px-3 px-3 gap-3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  href={item.to}

                >
                  <div
                    className={`flex-shrink-0 flex justify-center items-center `}
                  >
                    <img
                      src={item.mainImg}
                      alt={item.title}
                      className="object-contain "
                      width={90}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="sm:text-xl text-lg font-semibold">
                      {item.title}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="block lg:hidden">
              <div className="slider-container cursor-pointer w-auto">
                <Slider {...settings}>
                  {subjectsOffering.map((item, index) => (
                    <div key={index}>
                      <motion.a
                        className={`p-3 rounded-[30px] md:shadow-lg shadow-md flex items-center transition-shadow duration-300 bg-white cursor-pointer h-[120px] lg:px-3 px-3 gap-3 my-4 mx-2`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        href={item.to}

                      >
                        <div
                          className={`flex-shrink-0 flex justify-center items-center `}
                        >
                          <img
                            src={item.mainImg}
                            alt={item.title}
                            className="object-contain"
                            width={90}
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                          <p className="sm:text-xl text-lg font-semibold">
                            {item.title}
                          </p>
                        </div>
                      </motion.a>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </AnimatePresence>

        {isMobile ? (
          <motion.a
            className="flex justify-center w-fit mx-auto rounded-full "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", damping: 17 }}
            // onClick={() => {
            //   // navigate("/courses");
            //   scrollToTop();
            // }}
            href="/courses"
          >
            <CustomButton text="Show All Subjects" />
          </motion.a>
        ) : showAllSubjects ? (
          <motion.a
            className="flex justify-center w-fit mx-auto rounded-full mt-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", damping: 17 }}
            href="/courses"
          >
            <CustomButton text="Show All Subjects" />
          </motion.a>
        ) : (
          <motion.div
            className="flex justify-center w-fit mx-auto rounded-full mt-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", damping: 17 }}
            onClick={handleToggleSubjects}
          >
            <CustomButton text="Show More Subjects" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
