import React from "react";
import { fadedCircle } from "../../assets/img/images";
import { privacyPolicyData } from "../../data/data";

const PolicySection = ({ title }) => {
  const renderContentWithLinks = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href="https://tuitionhighway.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orangeHeading underline"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div>
      <div className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full bg-subjectsBg">
        <div className="absolute -top-56 left-0 -z-10 w-56">
          <img src={fadedCircle} alt="" className="object-contain" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-20 gap-8 ">
          <div>
            <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 flex flex-col gap-6">
              <div className="flex flex-col gap-8  max-w-full">
                <h3 className="xl:text-[42px] xl:leading-tight md:text-4xl sm:text-3xl text-3xl leading-none text-headingColor">
                  {title}
                </h3>

                <div className="flex flex-col gap-6">
                  {privacyPolicyData.map((section, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <h4 className="text-2xl font-semibold text-headingColor">
                        {index + 1}. {section.title}
                      </h4>
                      <p className="text-base text-headingColor leading-relaxed">
                        {renderContentWithLinks(section.content)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
