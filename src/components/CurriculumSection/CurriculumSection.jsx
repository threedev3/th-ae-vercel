import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { curricula } from "../../data/data";
import { Link } from "react-router-dom";

const CurriculumSection = ({ handleNavClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1032,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <div className="relative  max-w-full overflow-hidden sm:h-56 h-48">
      <div className="flex sm:h-64 h-48">
        <div className="  before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 xl:before:w-[32%] lg:before:w-[40%] md:before:w-[50%] min-[524px]:before:w-[58%] before:w-[62%] before:bg-orangeHeading before:-skew-x-[33deg] before:origin-top before:-z-10 sm:h-56 h-48">
          <div className=" flex flex-col justify-center items-start gap-2 min-[493px]:py-12 min-[393px]:py-6 py-6 md:pl-16 sm:pl-10 min-[393px]:pl-6 pl-3 z-10 sm:h-56 h-48">
            <h3 className="text-white xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] leading-none">
              Start Now!
            </h3>
            <button
              className="min-[393px]:mt-4 mt-1 min-[756px]:px-6 min-[493px]:px-4 min-[353px]:px-2 px-1 min-[353px]:py-2 py-1 bg-white text-headingColor font-semibold rounded-[13px] min-[756px]:text-base min-[493px]:text-sm text-xs"
              onClick={() => handleNavClick("Demo")}
            >
              Take A Free Demo
            </button>
          </div>
        </div>

        <div className="absolute w-full bg-gradient-to-r from-startgrad to-endGrad flex items-center sm:h-56 h-48 -z-20"></div>
        <div className="w-full xl:max-w-[70%] lg:max-w-[66%] min-[900px]:max-w-[56%] min-[860px]:max-w-[63%] md:max-w-[58%] min-[393px]:max-w-[50%] max-w-[53%] ml-auto flex flex-col items-start justify-start sm:gap-10 gap-6 sm:h-56 h-48 relative py-6">
          <h2 className="xl:text-[28px] xl:leading-tight min-[1047px]:text-2xl md:text-2xl sm:text-xl text-lg leading-none text-white lg:mx-auto sm:ml-20 min-[420px]:ml-10 ml-4 text-center">
            Popular Curriculums
          </h2>
          <div className="slider-container w-full cursor-pointer mx-auto">
            <Slider {...settings}>
              {curricula.map((item, index) => (
                <div key={index} className="min-[493px]:px-2 lg:px-4 mx-auto">
                  {" "}
                  <div className="min-[493px]:p-4 rounded-md">
                    <a
                      href={item.to}
                      className="text-white min-[1510px]:text-2xl sm:text-[22px] text-[17px] text-center font-semibold min-w-[200px]"
                     
                    >
                      {" "}
                      <span className="block">{item.firstTitle}</span>
                      <span className="block">{item.secondTitle}</span>
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSection;
