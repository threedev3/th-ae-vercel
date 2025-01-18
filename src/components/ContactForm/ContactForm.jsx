import React, { useEffect, useState } from "react";
import contactImg from "../../assets/img/contactimg.png";
import contactImg2 from "../../assets/img/freeDemo2.png";
import "react-international-phone/style.css";
import DemoForm from "../DemoForm/DemoForm";
import { useLocation } from "react-router-dom";
import TutorForm from "../TutorForm/TutorForm";
import ContactUs from "../ContactUs/ContactUs";
import { AnimatePresence, motion } from "framer-motion";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import ParentStudentForm from "../ParentStudentForm/ParentStudentForm";

// Modal component
const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Age Confirmation
            </h2>
            <p className="mb-6 text-gray-600">Are you 18 years or older?</p>
            <div className="flex justify-end space-x-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-contactBg text-gray-700 rounded-md hover:bg-contactBg2 transition-colors"
              >
                No
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="px-4 py-2 bg-blueHeading text-white rounded-md "
              >
                Yes, I am 18+
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ContactForm = ({ tagLine }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formType, setFormType] = useState("parent");

  const [activeTab, setActiveTab] = useState("parent");
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const normalizePathname = (pathname) => pathname.replace(/\/+$/, ""); // Removes trailing slashes

  const normalizedPath = normalizePathname(location.pathname);

  const isTutorPage = normalizedPath === "/join-as-a-tutor";
  const isContactPage = normalizedPath === "/contact-us";
  const isParentStudentPage = normalizedPath === "/create-your-account";

  // const isTutorPage = location.pathname === "/join-as-a-tutor";
  // const isContactPage = location.pathname === "/contact-us";
  // const isParentStudentPage = location.pathname === "/create-your-account";

  const [showDemoText, setShowDemoText] = useState(true);

  const handleTabChange = (tab) => {
    if (tab === "student") {
      setShowModal(true);
    } else {
      setActiveTab(tab);
      setFormType("parent");
      setCurrentStep(1);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setActiveTab("student");
    setFormType("student");
    setCurrentStep(2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDemoText((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:py-8 py-6 sm:px-12 px-6 max-w-full relative">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:gap-12 gap-8">
        <div className="flex flex-col gap-6 items-center text-headingColor ">
          {!isParentStudentPage && (
            <AnimatePresence mode="wait">
              {showDemoText ? (
                <motion.h3
                  key="demo"
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center gap-3 text-headingColor"
                >
                  {isTutorPage
                    ? "Join As Tutor"
                    : isContactPage
                    ? "Contact Us For More Details"
                    : isParentStudentPage
                    ? "Enter Parent/Student Details"
                    : "Book A Free Demo"}
                </motion.h3>
              ) : (
                <motion.h3
                  key="callback"
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center gap-3 text-headingColor"
                >
                  {isTutorPage
                    ? "Submit Your Resume"
                    : isContactPage
                    ? "Request For Any Query"
                    : isParentStudentPage
                    ? "Enter Subject Details"
                    : "Request a Call Back"}
                </motion.h3>
              )}
            </AnimatePresence>
          )}
          {!isParentStudentPage && (
            <p className="xl:text-lg sm:text-lg text-base text-center max-w-4xl mx-auto">
              {tagLine ||
                "Experience our top-notch tutoring firsthand. Schedule your free session today and see how we can transform your academic journey."}
            </p>
          )}

          {isParentStudentPage && (
            <div className="">
              <div className="flex p-1 bg-contactBg rounded-lg">
                {["parent", "student"].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab
                        ? "bg-blueHeading text-white"
                        : "text-headingColor hover:bg-gray-200"
                    }`}
                    onClick={() => handleTabChange(tab)}
                    // whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    I am a {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleModalConfirm}
          />
        </div>

        <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-8 flex flex-col items-center gap-12 px-4">
          {!isContactPage && !isParentStudentPage && (
            <div className="lg:block hidden ">
              <img
                src={isTutorPage ? contactImg2 : contactImg}
                alt=""
                className=" object-cover"
                width={500}
              />
            </div>
          )}
          {isContactPage && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-row xl:gap-6 lg:gap-3 sm:gap-6 gap-6 items-center">
                <MapPinIcon
                  className="xl:w-8 lg:w-6 sm:w-8 w-6 flex-shrink-0"
                  color="#008fbf"
                />
                <div className="flex flex-col gap-2 ">
                  <h3 className="text-headingColor xl:text-[22px] lg:text-xl sm:text-[22px] text-lg">
                    Address
                  </h3>
                  <p className="text-headingColor xl:text-base lg:text-sm sm:text-base text-sm">
                    ASE Global LLC-FZ Business Centre, Meydan Hotel, Nad Al
                    Sheeba, Dubai, UAE
                  </p>
                </div>
              </div>
              <div className="flex flex-row xl:gap-6 lg:gap-3 sm:gap-6 gap-6 items-center">
                <PhoneIcon
                  className="xl:w-8 lg:w-6 sm:w-8 w-6 flex-shrink-0"
                  color="#008fbf"
                />
                <div className="flex flex-col gap-2 ">
                  <h3 className="text-headingColor xl:text-[22px] lg:text-xl sm:text-[22px] text-lg">
                    Call Us
                  </h3>
                  <p className="text-headingColor xl:text-base lg:text-sm sm:text-base text-sm">
                    +971563511722
                  </p>
                </div>
              </div>
              <div className="flex flex-row xl:gap-6 lg:gap-3 sm:gap-6 gap-6 items-center">
                <EnvelopeIcon
                  className="xl:w-8 lg:w-6 sm:w-8 w-6 flex-shrink-0"
                  color="#008fbf"
                />
                <div className="flex flex-col gap-2 ">
                  <h3 className="text-headingColor xl:text-[22px] lg:text-xl sm:text-[22px] text-lg">
                    Email Us
                  </h3>
                  <p className="text-headingColor xl:text-base lg:text-sm sm:text-base text-sm">
                    hello@tuitionhighway.com
                  </p>
                </div>
              </div>
            </div>
          )}
          {isTutorPage ? (
            <TutorForm />
          ) : isContactPage ? (
            <ContactUs />
          ) : isParentStudentPage ? (
            formType && (
              <ParentStudentForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formType={formType}
                setFormType={setFormType}
              />
            )
          ) : (
            <DemoForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
