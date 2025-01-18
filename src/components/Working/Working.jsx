import React, { useState, useEffect, useRef } from "react";
import aGrade from "../../assets/img/aGrade.png";
import sprinklesGif from "../../assets/img/sprinkles.gif";
import Slider from "react-slick";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stepsContent } from "../../data/data";

const Working = () => {
  const [showSteps, setShowSteps] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(6);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const stepDuration = 8000;
    const imageDuration = 4000;

    let showStepsTimeout;
    let showImageTimeout;

    const toggleDisplay = () => {
      setShowSteps(true);
      setShowImage(false);

      showStepsTimeout = setTimeout(() => {
        setShowSteps(false);
        setShowImage(true);
      }, stepDuration);

      showImageTimeout = setTimeout(() => {
        setShowSteps(true);
        setShowImage(false);
      }, stepDuration + imageDuration);
    };

    const lastVisibleSlide = currentSlide + slidesToShow - 1;
    if (lastVisibleSlide >= stepsContent.length - 1) {
      toggleDisplay();
      const interval = setInterval(toggleDisplay, stepDuration + imageDuration);
      return () => {
        clearInterval(interval);
        clearTimeout(showStepsTimeout);
        clearTimeout(showImageTimeout);
      };
    }
  }, [currentSlide, slidesToShow, isInView]);

  const handleAfterChange = (index) => {
    setCurrentSlide(index);
  };

  const imageVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const gifVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(6);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 480) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    repeat: true,
    yoyo: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="sm:pt-8 xl:pb-4 py-6 sm:px-12 px-6 max-w-full relative xl:h-[440px] lg:h-[450px] h-[400px] flex items-center overflow-x-hidden"
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-4 justify-between  h-full w-full">
        <div className="flex flex-col gap-6 items-center text-headingColor">
          <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center text-headingColor">
            Easy Steps Towards Top Grades
          </h3>
        </div>

        <div className="slider-container w-auto relative">
          <AnimatePresence>
            {showSteps && isInView && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
              >
                <Slider {...settings}>
                  {stepsContent.map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative flex flex-col items-start px-4 py-8 "
                    >
                      {index >= 0 && (
                        <motion.div
                          className="absolute -left-8 top-14 h-1 bg-orangeHeading z-0"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                        />
                      )}

                      <motion.div
                        className="z-10 xl:w-16 xl:h-16 md:h-14 md:w-14 h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-orangeHeading to-toOrange text-white font-bold text-2xl relative hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 transition-colors duration-500 shadow-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          duration: 0.6,
                          delay: index * 0.3,
                        }}
                      >
                        {step.stepNumber}
                      </motion.div>

                      <motion.div
                        className="mt-6 flex flex-col gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                      >
                        <div>
                          <h3 className="font-bold xl:text-lg lg:text-base text-lg text-headingColor mb-1 tracking-wide">
                            {step.title}
                          </h3>
                          <h4 className="font-semibold xl:text-lg lg:text-base text-lg text-headingColor">
                            {step.subtitle}
                          </h4>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </Slider>
              </motion.div>
            )}

            {showImage && (
              <motion.div
                className="flex items-center justify-center  relative"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.img
                  key="sprinklesGif"
                  src={sprinklesGif}
                  alt="Sprinkles GIF"
                  className=" object-contain"
                  width={320}
                  variants={gifVariants}
                />
                <motion.img
                  key="aGrade"
                  src={aGrade}
                  alt="Additional Image"
                  className="object-contain absolute "
                  width={130}
                  variants={imageVariants}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Working;
