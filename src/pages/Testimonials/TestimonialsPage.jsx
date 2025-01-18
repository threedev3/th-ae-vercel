import React from "react";
import SubHeroSection from "../../components/SubHeroSection/SubHeroSection";
import ContactForm from "../../components/ContactForm/ContactForm";
import TestimonialsList from "../../components/TestimonialsList/TestimonialsList";
import SubjectSlider from "../../components/SubjectSlider/SubjectSlider";
import { Helmet } from "react-helmet";

const TestimonialsPage = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>{`Testimonials - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubHeroSection
        demoRef={demoRef}
        title="SUCCESS STORIES"
        description="Recommended by hundreds of delighted parents"
        handleNavClick={handleNavClick}
      />
      <TestimonialsList />
      <SubjectSlider demoRef={demoRef} handleNavClick={handleNavClick} />
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

export default TestimonialsPage;
