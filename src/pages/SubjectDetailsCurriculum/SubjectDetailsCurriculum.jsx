import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useParams } from "react-router-dom";
import { subjectsOffering } from "../../data/data";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import Testimonials from "../../components/Testimonials/Testimonials";
import SubjectSlider from "../../components/SubjectSlider/SubjectSlider";
import CurriculumSection from "../../components/CurriculumSection/CurriculumSection";
import SubjectDetailCompCurriculum from "../../components/SubjectDetailCompCurriculum/SubjectDetailCompCurriculum";
import { Helmet } from "react-helmet";

const SubjectDetailsCurriculum = ({ demoRef, handleNavClick }) => {
  const { slug, curriculumType } = useParams();

  const subject = subjectsOffering.find((s) => s.slug === slug);

  if (!subject) {
    return <NotFoundPage />;
  }

  const curriculumData = subject.content?.[curriculumType];

  if (!curriculumData) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Helmet>
        <title>{`${subject.title} ${curriculumType} - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <SubjectHeroSection
        title={
          (curriculumType === "igcse" || curriculumType === "cbse"
            ? curriculumType.toUpperCase()
            : curriculumType.replace("-", " ")) +
          " " +
          subject.title
        }
        description={`Explore ${
          curriculumType === "igcse" || curriculumType === "cbse"
            ? curriculumType.replace("-", " ").toUpperCase()
            : curriculumType.replace("-", " ")
        } in ${subject.title}`}
        curriculumType={curriculumType}
        handleNavClick={handleNavClick}
      />
      <SubjectDetailCompCurriculum
        subject={subject}
        curriculumData={curriculumData}
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

export default SubjectDetailsCurriculum;
