import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useParams } from "react-router-dom";
import { subjectsOffering } from "../../data/data";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import Testimonials from "../../components/Testimonials/Testimonials";
import SubjectSlider from "../../components/SubjectSlider/SubjectSlider";
import SubjectDetailComp from "../../components/SubjectDetailComp/SubjectDetailComp";
import CurriculumSection from "../../components/CurriculumSection/CurriculumSection";
import { Helmet } from "react-helmet";

const SubjectDetails = ({ demoRef, handleNavClick }) => {
  const { slug } = useParams();

  const subject = subjectsOffering.find((s) => s.slug === slug);

  if (!subject) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Helmet>
        <title>{`${subject.title} - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubjectHeroSection
        title={subject.title}
        description={subject.tagLine}
        handleNavClick={handleNavClick}
      />
      <SubjectDetailComp subject={subject} handleNavClick={handleNavClick} />
      <Testimonials />
      <CurriculumSection handleNavClick={handleNavClick} />
      <SubjectSlider handleNavClick={handleNavClick} />

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

export default SubjectDetails;
