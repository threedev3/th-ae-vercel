import React, { useEffect, useState } from "react";
import { thankYouImg } from "../../assets/img/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { thankyouSteps } from "../../data/data";



function ThankYou() {
  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
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

  const handleAfterChange = (index) => {
    setCurrentSlide(index);
  };


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
    <div className="relative max-w-full overflow-x-hidden ">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-6 items-center justify-center min-h-96 sm:py-12 py-8 px-4">
        {/* <div className="p-6 bg-white shadow-xl rounded-xl flex flex-col gap-8">
          <div className="sm:w-[80%] w-[100%] mx-auto">
            <img src={thankYouImg} alt="" className="w-full object-contain" />
          </div>
          <div>
            <p className="text-headingColor text-base text-center max-w-lg mx-auto font-semibold">
              Thank you for visiting Tuition Highway. One of our representative
              will be in touch shortly.
            </p>
          </div>
        </div> */}

        <div className="flex flex-col gap-6 items-center text-headingColor">
          <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center text-headingColor">
            What Happens Next
          </h3>
        </div>

        <div className="slider-container w-full relative">
          <AnimatePresence>
            
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
                className="w-full"
              >
                <Slider {...settings} className="w-full">
                  {thankyouSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative flex flex-col items-start px-4 py-8 w-full"
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
                          {/* <h4 className="font-semibold xl:text-lg lg:text-base text-lg text-headingColor">
                            {step.subtitle}
                          </h4> */}
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </Slider>
              </motion.div>
  
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
