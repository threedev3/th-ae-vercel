import React from "react";
import { testimonials } from "../../data/data";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard";

const TestimonialsList = () => {
  return (
    <div className="relative md:py-20 py-12 xl:px-6 lg:px-12 px-6 max-w-full">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-20 gap-8 ">
        <div className="flex flex-col sm:gap-4 gap-4 items-center text-headingColor ">
          <h3 className="xl:text-[42px] xl:leading-tight md:text-4xl sm:text-3xl text-3xl leading-none text-center">
            What Our Parents Say
          </h3>
          <p className="lg:text-lg sm:text-base text-sm text-center max-w-lg mx-auto">
            Dive into a learning journey tailored just for them with our expert
            homework assistance program.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 lg:gap-16 sm:grid-cols-2 md:gap-6 grid-cols-1 gap-3 place-items-center">
          {testimonials.map((item, index) => (
            <TestimonialsCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsList;
