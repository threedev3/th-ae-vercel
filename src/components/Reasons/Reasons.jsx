import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomButton from "../CustomButton/CustomButton";
import { motion } from "framer-motion";
import { reasons } from "../../data/data.js";
import Slider from "react-slick";

const Reasons = ({ handleNavClick }) => {
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 444,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };


  return (
    <div className="relative md:py-20 py-12 px-6 max-w-full">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-12 gap-8 ">
        <div className="flex flex-col sm:gap-6 gap-4 items-center text-headingColor ">
          <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center text-headingColor">
            Your Fast Track To Top Grades
          </h3>

          <p className="xl:text-lg sm:text-lg text-base text-center max-w-4xl mx-auto font-medium">
            Personalized tutoring by experts in all subjects. Progress
            monitoring and flexible scheduling ensure your academic success.
          </p>
        </div>

        <div className="slider-container cursor-pointer w-auto relative">
          <Slider {...settings}>
            {reasons.map((item, index) => (
              <motion.div key={index} className="relative w-full h-full">
            

                <motion.div className="flex flex-col gap-4 transition-shadow duration-300 group xl:min-h-[200px] min-h-[200px] my-4 mx-2 px-3">
                  <div className=" mx-auto">
                   
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="object-contain"
                      width={80}
                    />
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-center mx-auto">
                    <p className="xl:text-xl text-lg text-headingColor font-semibold min-[444px]:block hidden text-center">
                      {item.firstTitle}{" "}
                      <span className="block">{item.secondTitle}</span>
                    </p>
                    <p className="xl:text-xl text-lg text-headingColor font-semibold min-[444px]:hidden block text-center">
                      {item.wholeTitle}
                    </p>
                    <p className="sm:text-sm text-sm text-headingColor text-center max-w-52">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            
            ))}
          </Slider>
        </div>

        <motion.div
          className="mx-auto cursor-pointer"
          onClick={() => handleNavClick("Demo")}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", damping: 17 }}
        >
          <CustomButton text="Book A Free Trial Lesson" />
        </motion.div>
      </div>
    </div>
  );
};

export default Reasons;
