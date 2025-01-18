import React from "react";

const EnrollDetails = ({ title, content, imgSrc }) => {
  return (
    <div>
      <div className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full min-h-[40vh]">
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-20 gap-8 ">
          <div>
            <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 flex flex-col gap-6">
              <div className="flex flex-col gap-8 lg:max-w-[50%] max-w-full">
                <h3 className="xl:text-[42px] xl:leading-tight md:text-4xl sm:text-3xl text-3xl leading-none text-headingColor">
                  {title}
                </h3>

                <div className="flex flex-col gap-6">
                  {content.map((item, index) => (
                    <div className="flex flex-row gap-4" key={index}>
                      <div className="w-4 h-4 bg-blueBtn rounded-full flex-shrink-0 mt-1.5"></div>
                      <div className="">
                        <p className="lg:text-base text-base font-bold inline">
                          {item.heading}
                        </p>
                        {item.description && (
                          <p className="lg:text-base text-base font-medium inline">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:block hidden">
                <img src={imgSrc} alt="" className="w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollDetails;
