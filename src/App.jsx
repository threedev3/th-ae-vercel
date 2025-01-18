import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useRef } from "react";
import TestimonialsPage from "./pages/Testimonials/TestimonialsPage";
import SubjectsPage from "./pages/Subjects/SubjectsPage";
import About from "./pages/About/About";
import SubjectDetails from "./pages/SubjectDetails/SubjectDetails";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TakingDemoPage from "./pages/TakingDemoPage/TakingDemoPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import JoinTutor from "./pages/JoinTutor/JoinTutor";
import Blogs from "./pages/Blogs/Blogs";
import ContactPage from "./pages/ContactPage/ContactPage";
import WhatsappIcon from "./components/WhatsappIcon/WhatsappIcon";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import SubjectDetailsCurriculum from "./pages/SubjectDetailsCurriculum/SubjectDetailsCurriculum";
import SlugRoute from "./slugRoutes";
import { useScrollToSection } from "./hooks/useScrollToSection";
import { Toaster } from "react-hot-toast";
import ParentDetailForm from "./pages/ParentDetailForm/ParentDetailForm";

function App() {
  const demoRef = useRef(null);

  const sections = {
    Demo: demoRef,
  };

  const handleNavClick = useScrollToSection(sections);
  return (
    <>
      <Navbar handleNavClick={handleNavClick} />
      <Routes>
        <Route
          path="/"
          element={<Home demoRef={demoRef} handleNavClick={handleNavClick} />}
        />
        <Route
          path="/testimonials"
          element={
            <TestimonialsPage
              demoRef={demoRef}
              handleNavClick={handleNavClick}
            />
          }
        />
        <Route
          path="/courses"
          element={
            <SubjectsPage demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        {/* <Route
            path="/:slug"
            element={
              <SubjectDetails
                demoRef={demoRef}
                handleNavClick={handleNavClick}
              />
            }
          /> */}
        <Route
          path="/:slug/:curriculumType"
          element={
            <SubjectDetailsCurriculum
              demoRef={demoRef}
              handleNavClick={handleNavClick}
            />
          }
        />

        <Route
          path="/:slug"
          element={
            <SlugRoute demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/about-us"
          element={<About demoRef={demoRef} handleNavClick={handleNavClick} />}
        />
        <Route
          path="/contact-us"
          element={
            <ContactPage demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/blogs"
          element={<Blogs demoRef={demoRef} handleNavClick={handleNavClick} />}
        />

        <Route
          path="/free-demo"
          element={
            <TakingDemoPage demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/join-as-a-tutor"
          element={
            <JoinTutor demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <TermsOfService demoRef={demoRef} handleNavClick={handleNavClick} />
          }
        />
        <Route
          path="/create-your-account"
          element={
            <ParentDetailForm
              demoRef={demoRef}
              handleNavClick={handleNavClick}
            />
          }
        />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsappIcon />
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
