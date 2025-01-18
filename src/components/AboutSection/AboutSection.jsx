import React from "react";
import { aboutImg } from "../../assets/img/images";
import { CheckIcon } from "@heroicons/react/24/outline";

const AboutSection = () => {
  return (
    <div className="relative md:py-20 py-12 sm:px-12 px-6 max-w-full ">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-12 gap-8 ">
        <div className="md:flex md:flex-row md:justify-between md:items-center flex flex-col gap-8">
          <div className="flex flex-col gap-2 lg:max-w-[65%]">
            <div className="flex flex-row gap-4 items-center ml-3">
              <div className="sm:h-4 sm:w-4 h-3 w-3 bg-orangeHeading"></div>
              <h4 className="text-headingColor sm:text-lg text-base">
                Welcome To Tuition Highway
              </h4>
            </div>
            <h3 className="xl:text-[42px] xl:leading-tight md:text-4xl sm:text-3xl text-3xl leading-none font-bold text-headingColor capitalize">
              About the Company
            </h3>

            <div className="flex flex-col gap-10 mt-4 font-medium">
              <p className="text-headingColor">
                Tuition Highway started in 2017 to meet the demand for flexible
                online tutoring. With our experienced and qualified faculty from
                around the world, we provide one-to-one and group online lessons
                to help improve grades, fill gaps in learning, and boost future
                chances.
              </p>
              <p className="text-headingColor">
                Tuition Highway is here to change things. We provide a smart
                platform with top-notch teachers, dedicated to helping students
                do their best. We make tricky topics easy to understand from
                home, helping students do well and opening doors to better
                education
              </p>
              <p className="text-headingColor">
                Our platform is a safe place for online learning. It lets
                parents keep an eye on their child's progress and share thoughts
                with teachers. Our talented teachers can cover a range of
                subjects, from KS2, KS3, GCSE, IGCSE, and A-Level to IB,
                American, French, and Indian systems. Our lessons can be
                tailored to fit any lifestyle, anywhere in the world.
              </p>
            </div>
          </div>

          <div className="md:mx-0 mx-auto lg:block hidden">
            <img
              src={aboutImg}
              alt="aboutImg"
              className="md:w-96 w-80 object-contain"
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-8 grid grid-cols-1 gap-4">
          <div className="flex gap-3 items-start border-2 border-borderColor p-3 rounded-md">
            <div className="mt-0.5">
              <div className="rounded-full bg-orangeHeading p-0.5  flex-shrink-0">
                <CheckIcon className="w-4 text-white font-bold flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-6 text-headingColor">
              <h3 className="text-lg">Our Mission</h3>

              <p className="font-medium">
                Our mission is to bridge the gap between students and quality
                education regardless of their geographical location. Through
                personalized online tutoring, we aim to empower each student
                with knowledge, skills, and the confidence to excel in their
                studies, paving their way to a bright future.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start border-2 border-borderColor p-3 rounded-md">
            <div className="mt-0.5">
              <div className="rounded-full bg-orangeHeading p-0.5  flex-shrink-0">
                <CheckIcon className="w-4 text-white font-bold flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-6 text-headingColor">
              <h3 className="text-lg">Our Vision</h3>

              <p className="font-medium">
                Our vision is to be a leading online tutoring service,
                recognized for our excellence in education and commitment to
                fostering academic success. We strive to adapt and evolve in
                response to the ever-changing needs of students and parents,
                ensuring accessible, innovative, and effective learning
                solutions for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
