import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useParams } from "react-router-dom";
import { curriculumOffering } from "../../data/data";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import Testimonials from "../../components/Testimonials/Testimonials";
import SubjectSlider from "../../components/SubjectSlider/SubjectSlider";
import CurriculumDetailComp from "../../components/CurriculumDetailComp/CurriculumDetailComp";
import CurriculumSection from "../../components/CurriculumSection/CurriculumSection";
import { Helmet } from "react-helmet";

const CurriculumPage = ({ demoRef, handleNavClick }) => {
  const { slug } = useParams();

  const curriculum = curriculumOffering.find((s) => s.slug === slug);

  if (!curriculum) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <Helmet>
        <title>{`${curriculum.title} - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubjectHeroSection
        title={curriculum.title}
        description={curriculum.tagLine}
        handleNavClick={handleNavClick}
      />
      <CurriculumDetailComp
        curriculum={curriculum}
        handleNavClick={handleNavClick}
      />
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

export default CurriculumPage;
