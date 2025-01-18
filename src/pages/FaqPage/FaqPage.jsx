import React from "react";
import SubHeroSection from "../../components/SubHeroSection/SubHeroSection";
import AllFaqs from "../../components/AllFaqs/AllFaqs";
import { Helmet } from "react-helmet";

const FaqPage = () => {
  return (
    <div>
      <Helmet>
        <title>FAQs - Tuition Highway - Online Tuition in UAE</title>
      </Helmet>
      <SubHeroSection
        title="Frequently Asked Questions"
        description="Find quick answers to your queries about services"
        btnText="Back To Home"
      />
      <AllFaqs />
    </div>
  );
};

export default FaqPage;
