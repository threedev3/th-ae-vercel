import React from "react";
import SubjectHeroSection from "../../components/SubjectHeroSection/SubjectHeroSection";
import ContactForm from "../../components/ContactForm/ContactForm";
import EnrollDetails from "../../components/EnrollDetails/EnrollDetails";
import { joinTutorDetails } from "../../data/data";
import { joinTutor } from "../../assets/img/images";
import { Helmet } from "react-helmet";

const JoinTutor = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>Join As Tutor - Tuition Highway - Online Tuition in UAE</title>
      </Helmet>
      <SubjectHeroSection
        title="Join As a Tutor"
        description="Join our team of dedicated professionals and make a difference in students lives globally"
        btnText={"Join Now"}
        handleNavClick={handleNavClick}
      />
      <EnrollDetails
        title="Join As a Tutor Now"
        content={joinTutorDetails}
        imgSrc={joinTutor}
      />
      <div ref={demoRef}>
        <ContactForm
          demoRef={demoRef}
          firstString={"Start Your Journey As "}
          secondString={"Tutor"}
          tagLine="Be a part of our mission to inspire and empower students to achieve their full potential worldwide."
        />
      </div>
    </div>
  );
};

export default JoinTutor;
