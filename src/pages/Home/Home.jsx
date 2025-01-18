import React, { useRef } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import TutorNumbers from "../../components/TutorNumbers/TutorNumbers";
import Reasons from "../../components/Reasons/Reasons";
import Subjects from "../../components/Subjects/Subjects";
import CurriculumSection from "../../components/CurriculumSection/CurriculumSection";
import Tutors from "../../components/Tutors/Tutors";
import Learn from "../../components/Learn/Learn";
import Testimonials from "../../components/Testimonials/Testimonials";
import Working from "../../components/Working/Working";
import ContactForm from "../../components/ContactForm/ContactForm";
import Faq from "../../components/Faq/Faq";
import { Helmet } from "react-helmet";
import SEOText from "../../components/SEOText/SEOText";

const Home = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>Home - Tuition Highway - Online Tuition in UAE</title>
      </Helmet>
      <HeroSection handleNavClick={handleNavClick} />
      <TutorNumbers />
      <Reasons handleNavClick={handleNavClick} />
      <Subjects />
      <CurriculumSection handleNavClick={handleNavClick} />
      <Tutors />
      <Learn
        firstHead="Satisfaction Guaranteed!"
        description="We're committed to your success. If you're not satisfied with your first session, we'll make it right. Your education is our top priority."
        style="text-white xl:text-lg min-[896px]:text-base sm:text-sm text-sm md:text-start text-center"
        textStyle="min-[1140px]:max-w-xl min-[896px]:max-w-md min-[836px]:max-w-sm md:max-w-xs max-w-sm"
      />
      <Testimonials />
      <Working />
      <div ref={demoRef}>
        <ContactForm
          demoRef={demoRef}
          firstString={"Book A Free Demo - "}
          secondString={"Request a Call Back"}
        />
      </div>
      <Faq />
      <SEOText />
    </div>
  );
};

export default Home;
