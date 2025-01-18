import React from "react";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import ContactForm from "../../components/ContactForm/ContactForm";
import EnrollDetails from "../../components/EnrollDetails/EnrollDetails";
import { enrollDetails } from "../../data/data";
import { freeDemo } from "../../assets/img/images";
import { Helmet } from "react-helmet";

const TakingDemoPage = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>{`Taking A Demo - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubjectHeroSection
        title="Take A Free Demo"
        description="Experience our personalised, high-quality online lessons and simplify your child’s educational journey"
        handleNavClick={handleNavClick}
      />
      <EnrollDetails
        title="Start Your Free Trial Now!"
        content={enrollDetails}
        imgSrc={freeDemo}
        handleNavClick={handleNavClick}
      />
      <div ref={demoRef}>
        <ContactForm
          demoRef={demoRef}
          firstString={"Request a Free "}
          secondString={"Demo"}
        />
      </div>
    </div>
  );
};

export default TakingDemoPage;
