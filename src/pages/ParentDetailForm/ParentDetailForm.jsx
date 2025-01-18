import React from "react";
import { Helmet } from "react-helmet";
import SubHeroSection from "../../components/SubHeroSection/SubHeroSection";
import ContactForm from "../../components/ContactForm/ContactForm";

const ParentDetailForm = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>
          Parent & Student Details - Tuition Highway - Online Tuition in UAE
        </title>
      </Helmet>
      <SubHeroSection
        demoRef={demoRef}
        title="Start Your Learning Journey Today!"
        description="Create your account and start learning with expert tutors right away."
        handleNavClick={handleNavClick}
        btnText={"Get Started"}
      />
      <div ref={demoRef}>
        <ContactForm demoRef={demoRef} />
      </div>
    </div>
  );
};

export default ParentDetailForm;
