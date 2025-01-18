import React from "react";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import PolicySection from "../../components/PolicySection/PolicySection";
import { Helmet } from "react-helmet";

const PrivacyPolicy = ({ demoRef }) => {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy - Tuition Highway - Online Tuition in UAE</title>
      </Helmet>
      <SubjectHeroSection
        demoRef={demoRef}
        title="Privacy Policy"
        description="The best and most secured service for our clients"
        btnText={"Back To Home"}
      />
      <PolicySection title="Privacy Policy" />
    </div>
  );
};

export default PrivacyPolicy;
