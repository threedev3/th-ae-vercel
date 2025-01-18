import React from "react";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import TermsSection from "../../components/TermsSection/TermsSection";
import { Helmet } from "react-helmet";

const TermsOfService = ({ demoRef }) => {
  return (
    <div>
      <Helmet>
        <title>{`Terms Of Service - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubjectHeroSection
        demoRef={demoRef}
        title="Terms Of Service"
        description="The best and most secured service for our clients"
        btnText={"Back To Home"}
      />
      <TermsSection title="Terms of Service" />
    </div>
  );
};

export default TermsOfService;
