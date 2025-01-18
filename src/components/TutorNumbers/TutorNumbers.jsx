import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import { numbers } from "../../data/data";

const TutorNumbers = () => {
  return (
    <div className="relative sm:py-12 py-8 sm:px-12 px-6 max-w-full bg-gradient-to-r from-startgrad to-endGrad">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 justify-center items-stretch">
        <div className="sm:grid sm:grid-cols-4 lg:gap-32 md:gap-16 grid grid-cols-2 gap-4 place-content-between">
          {numbers.map((item, index) => {
            const motionValue = useMotionValue(0);
            const [displayValue, setDisplayValue] = useState(0);

            const ref = React.useRef(null);
            const isInView = useInView(ref, { once: true });

            useEffect(() => {
              if (isInView) {
                const animation = animate(motionValue, item.count, {
                  duration: 2,
                  onUpdate: (latest) => {
                    setDisplayValue(Math.round(latest));
                  },
                });

                return () => animation.stop();
              }
            }, [isInView, motionValue, item.count]);

            return (
              <motion.div
                ref={ref}
                key={index}
                className="p-3 flex flex-col justify-center items-center gap-2 "
              >
                <motion.h3 className="text-white xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl text-4xl font-extrabold text-center z-10">
                  {displayValue}
                  <span className="text-2xl">{item.suffix}</span>
                </motion.h3>
                <p className="text-white md:text-xl text-lg font-semibold text-center z-10">
                  {item.title} <span className="block">{item.spanTitle}</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TutorNumbers;
