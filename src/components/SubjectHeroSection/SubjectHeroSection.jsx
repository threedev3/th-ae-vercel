import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubjectHeroSection = ({
  title,
  description,
  btnText,
  handleNavClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPrivacyPolicyPage =
    location.pathname === "/privacy-policy" ||
    location.pathname === "/terms-conditions";
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="sm:py-20 py-12 sm:px-12 px-6 max-w-full relative bg-gradient-to-r from-startgrad to-endGrad">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div>
            <h3 className="text-white lg:text-[46px] xl:leading-tight md:text-4xl sm:text-3xl text-[27px] lg:leading-[3.5rem] leading-8 font-extrabold max-w-3xl text-center capitalize">
              {title}
            </h3>
          </div>
          <div>
            <p
              className={`xl:text-lg sm:text-lg min-[540px]:text-base text-sm text-white text-center max-w-lg capitalize`}
            >
              {description}
            </p>
          </div>
        </div>

        <div
          className="py-2 px-5 bg-orangeHeading  flex gap-1 rounded-md cursor-pointer"
          onClick={() => handleNavClick("Demo")}
        >
          <button
            className="text-white font-semibold"
            onClick={isPrivacyPolicyPage ? navigateHome : undefined}
          >
            {btnText || "Book A Free Trial"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeroSection;
