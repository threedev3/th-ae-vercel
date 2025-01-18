import React from "react";
import SubHeroSection from "../../components/SubHeroSection/SubHeroSection";
import Faq from "../../components/Faq/Faq";
import ContactForm from "../../components/ContactForm/ContactForm";
import Learn from "../../components/Learn/Learn";
import BlogsSection from "../../components/BlogsSection/BlogsSection";
import { Helmet } from "react-helmet";

const Blogs = ({ demoRef, handleNavClick }) => {
  return (
    <div>
      <Helmet>
        <title>Blogs - Tuition Highway - Online Tuition in UAE</title>
      </Helmet>
      <SubHeroSection
        title="Blogs"
        description="Achieving Academic Excellence with Tuition Highway"
        handleNavClick={handleNavClick}
      />
      <BlogsSection />
      <Learn
        firstHead="Online Tutoring"
        secondHead="With Real Teachers"
        description="Instant Online Tutoring - All Subjects, Anytime, Anywhere"
        style="font-semibold text-white lg:text-xl min-[896px]:text-lg sm:text-base text-sm tracking-wider md:text-start text-center"
        textStyle="min-[1140px]:max-w-md min-[896px]:max-w-md min-[836px]:max-w-sm md:max-w-xs max-w-sm"
      />
      <div ref={demoRef}>
        <ContactForm
          demoRef={demoRef}
          firstString={"Request a Free "}
          secondString={"Demo"}
        />
      </div>
      <Faq />
    </div>
  );
};

export default Blogs;
