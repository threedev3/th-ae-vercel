import React, { useEffect } from "react";
import SubHeroSection from "../../components/SubHeroSection/SubHeroSection";
import ThankYou from "../../components/ThankYou/ThankYou";
import { Helmet } from "react-helmet";

const ThankYouPage = () => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.location.href = "/";
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <div>
      <Helmet>
        <title>{`Thank You - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubHeroSection
        title="Thank You!"
        description="We’ve received your inquiry and will respond promptly to arrange your free trial class as soon as possible. In the meantime, feel free to explore our website for more information or discover what makes our classes unique!"
        // secondText="In the meantime, feel free to explore our website for more information or discover what makes our classes unique!"
        btnText="Back To Home"
      />
      <ThankYou />
    </div>
  );
};

export default ThankYouPage;
