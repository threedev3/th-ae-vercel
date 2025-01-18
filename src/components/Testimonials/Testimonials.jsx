import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";
import { testimonials } from "../../data/data";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard";

const Testimonials = () => {
  const sliderRef = useRef(null);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="relative md:py-20 py-10 sm:px-12 px-6 max-w-full overflow-x-hidden">
      <div className="absolute inset-0 bg-heroBg transition-all duration-500 ease-in-out blur-md "></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-12 gap-8 items-center justify-center ">
        <div className="flex flex-col gap-8 ">
          <div>
            <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center text-headingColor">
              Testimonials and Success Stories
            </h3>
          </div>
        </div>
        <div className="min-[1400px]:max-w-full min-[1200px]:max-w-full lg:max-w-full md:max-w-full max-w-full ">
          <div className="slider-container w-auto cursor-pointer sm:mx-0 mx-auto">
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((item, index) => (
                <TestimonialsCard item={item} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
