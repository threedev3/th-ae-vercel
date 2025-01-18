import React, { useEffect, useRef } from "react";
import { learningImg2 } from "../../assets/img/images.js";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const Learn = ({ firstHead, secondHead, description, style, textStyle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });


  return (
    <div className="md:py-6 py-6 sm:px-12 px-6 max-w-full relative bg-gradient-to-r from-startgrad to-endGrad">
      <div className="max-w-[1400px] mx-auto md:flex md:flex-row md:justify-evenly md:items-center md:gap-4 flex flex-col gap-4 justify-center items-center">
        <div className="flex xl:gap-12 sm:gap-6 gap-2 justify-between items-center">
          <div className="relative xl:w-[106px] min-[769px]:w-[85px] sm:w-20 w-16">
            <div className="md:absolute xl:-top-12 -top-10 z-10">
              <motion.img
                src={learningImg2}
                alt=""
                className="object-contain"
                width={110}
                ref={ref}
                initial={{ scale: 1 }}
                animate={
                  isInView
                    ? {
                        scale: [1, 1.3, 1], 
                        rotate: [0, 4, -12, 0], 
                        transition: {
                          ease: "easeInOut", 
                        },
                      }
                    : { scale: 1 } 
                }
              />
            </div>
          </div>
          <div className="max-w-3xl">
            <h3 className="text-white min-[1350px]:text-[38px] min-[1350px]:leading-[3.5rem] xl:text-3xl lg:text-[26px] lg:leading-9 md:text-[22px] md:leading-8 min-[416px]:text-2xl min-[360px]:text-[19px] text-[17px]">
              {firstHead}{" "}
              <span className="block font-MontserratBold">{secondHead}</span>
            </h3>
          </div>
        </div>

        <div className={`${textStyle}`}>
          <p className={`${style} `}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Learn;
