import React, { useState } from "react";
import {
  customStyles,
  ourCurriculum,
  selectedCountries,
  subjectsOffer,
} from "../../data/data";
import useFormValidation from "../../hooks/useFormValidation";
import { PhoneInput } from "react-international-phone";
import Select from "react-select";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import axios from "axios";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

const DemoForm = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const { errors, validateDemo } = useFormValidation();
  const [isLoading, setIsLoading] = useState();

  const [formValues, setFormValues] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    city: "",
    // country: null,
    selectedSubject: null,
    selectedGrade: null,
    selectedCurriculum: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone) => {
    setFormValues((prev) => ({ ...prev, phone }));
  };

  const handleSelectorChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const validatePhoneNumber = () => {
    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(
        formValues.phone,
        formValues.country?.value || "AE"
      );
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (error) {
      return false;
    }
  };

  // const validateStep = (step) => {
  //   const fieldsByStep = {
  //     1: ["parentName", "studentName", "email", "phone", "city", "country"],
  //   };

  //   const stepFields = fieldsByStep[step];
  //   const errorsFound = stepFields.some((field) => {
  //     if (field === "phone" && !validatePhoneNumber()) {
  //       toast.error("Please enter a valid phone number.");
  //       return true;
  //     } else if (!formValues[field]) {
  //       toast.error(`Please fill out the ${field} field.`);
  //       return true;
  //     }
  //     return false;
  //   });
  //   return !errorsFound;
  // };

  // const handleNext = () => {
  //   if (validateStep(currentStep)) {
  //     setCurrentStep((prev) => prev + 1);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (currentStep < 2) {
    //   // handleNext();
    // }

    if (validateDemo(formValues)) {
      const submissionData = {
        parent_name: formValues.parentName,
        student_name: formValues.studentName,
        email: formValues.email,
        dynamicFields: {
          phone_number: formValues.phone,
          city: formValues.city,
          // country: formValues.country?.label || null,
          subjects: formValues.selectedSubject.map((subject) => subject.label),
          grade: formValues.selectedGrade?.label || null,
          curriculum: formValues.selectedCurriculum?.label || null,
        },
      };

      try {
        setIsLoading(true);

        const response = await axios.post(
          `${BASE_URL}/webLeads/demo`,
          // "http://localhost:5000/api/v1/webLeads/demo",
          submissionData
        );
        // setCurrentStep(1);

        // console.log("submissionData", submissionData);

        setFormValues({
          parentName: "",
          studentName: "",
          email: "",
          phone: "",
          city: "",
          // country: null,
          selectedSubject: null,
          selectedGrade: null,
          selectedCurriculum: null,
        });
        setIsLoading(false);
        window.location.href = "/thank-you";
      } catch (error) {
        toast.error("Failed to submit form. Please try again.");
      } finally {
        setIsLoading(false); // End loading state
      }
    } else {
      toast.error("Form Validation Error");
    }
  };
  const preventEnterKey = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const countryObjects = selectedCountries.map((country, index) => ({
    value: country,
    label: country,
  }));

  const subjectOptions = subjectsOffer.map((subject, index) => ({
    value: subject,
    label: subject,
  }));

  const grades = Array.from({ length: 13 }, (_, i) => (i + 1).toString());
  const gradeOptions = grades
    .map((grade, index) => ({
      value: grade,
      label: grade,
    }))
    .reverse();

  const curriculumOptions = ourCurriculum.map((subject, index) => ({
    value: subject,
    label: subject,
  }));

  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (step) => {
    // Only navigate if the current step is valid or the clicked step is prior to the current step
    if (step < currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  return (
    <div>
      {/* <div className="flex">
        {[1, 2].map((step) => (
          <div
            key={step}
            className={`py-4 sm:px-8 min-[375px]:px-6 px-4 text-center cursor-pointer rounded-t-xl font-semibold ${
              currentStep === step ? "bg-contactBg" : "bg-contactBg2"
            }`}
            onClick={() => handleStepClick(step)}
          >
            Step {step}
          </div>
        ))}
      </div> */}
      <div className=" xl:w-[700px] lg:w-[550px] sm:w-[600px] min-[450px]:w-[400px] min-[400px]:w-[350px] w-[300px] bg-contactBg p-8 rounded-lg  shadow-lg ">
        <form
          className="transition-transform duration-500 ease-in-out "
          onSubmit={handleSubmit}
          onKeyDown={preventEnterKey}
        >
          {/* {currentStep === 1 && ( */}
          <div className="sm:space-y-6">
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="text"
                  name="parentName"
                  placeholder="Parent Name"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.parentName}
                  onChange={handleInputChange}
                />
                {errors.parentName && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.parentName}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.studentName}
                  onChange={handleInputChange}
                />
                {errors.studentName && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.studentName}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <div className="py-0.5 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor">
                  <PhoneInput
                    defaultCountry="ae"
                    name="phone"
                    value={formValues.phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone Number"
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="py-3 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <Select
                  name="grade"
                  options={gradeOptions}
                  classNamePrefix="select"
                  value={formValues.selectedGrade}
                  onChange={(grade) =>
                    handleSelectorChange("selectedGrade", grade)
                  }
                  styles={customStyles}
                  placeholder="Select Grade"
                  components={{
                    DropdownIndicator: (props) => (
                      <ChevronDownIcon className="w-5 h-5 text-black" />
                    ),
                  }}
                />
                {errors.selectedGrade && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.selectedGrade}
                  </span>
                )}
              </div>
              {/* <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <Select
                    name="country"
                    options={countryObjects}
                    classNamePrefix="select"
                    value={formValues.country}
                    onChange={(country) =>
                      handleSelectorChange("country", country)
                    }
                    styles={customStyles}
                    placeholder="Select Country"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                  {errors.country && (
                    <span className="text-red-600 sm:text-base text-sm">
                      {errors.country}
                    </span>
                  )}
                </div> */}
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <Select
                  isMulti
                  name="subjects"
                  options={subjectOptions}
                  classNamePrefix="select"
                  value={formValues.selectedSubject}
                  onChange={(subject) =>
                    handleSelectorChange("selectedSubject", subject)
                  }
                  styles={customStyles}
                  placeholder="Select Subjects"
                  components={{
                    DropdownIndicator: (props) => (
                      <ChevronDownIcon className="w-5 h-5 text-black" />
                    ),
                  }}
                />
                {errors.selectedSubject && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.selectedSubject}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <Select
                  name="curriculum"
                  options={curriculumOptions}
                  classNamePrefix="select"
                  value={formValues.selectedCurriculum}
                  onChange={(curriculum) =>
                    handleSelectorChange("selectedCurriculum", curriculum)
                  }
                  styles={customStyles}
                  placeholder="Select Curriculum"
                  components={{
                    DropdownIndicator: (props) => (
                      <ChevronDownIcon className="w-5 h-5 text-black" />
                    ),
                  }}
                />
                {errors.selectedCurriculum && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.selectedCurriculum}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              {/* <button
                type="button"
                onClick={handleNext}
                className="bg-blueHeading mt-8 text-white px-6 py-2 rounded-full shadow-lg "
              >
                Next
              </button> */}
              <button
                className="bg-orangeHeading  mt-8 text-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-600"
                type="submit"
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
          {/* )} */}

          {/* {currentStep === 2 && (
            <div className="sm:space-y-6">
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <Select
                    isMulti
                    name="subjects"
                    options={subjectOptions}
                    classNamePrefix="select"
                    value={formValues.selectedSubject}
                    onChange={(subject) =>
                      handleSelectorChange("selectedSubject", subject)
                    }
                    styles={customStyles}
                    placeholder="Select Subjects"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                  {errors.selectedSubject && (
                    <span className="text-red-600 sm:text-base text-sm">
                      {errors.selectedSubject}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <Select
                    name="grade"
                    options={gradeOptions}
                    classNamePrefix="select"
                    value={formValues.selectedGrade}
                    onChange={(grade) =>
                      handleSelectorChange("selectedGrade", grade)
                    }
                    styles={customStyles}
                    placeholder="Select Grade"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                  {errors.selectedGrade && (
                    <span className="text-red-600 sm:text-base text-sm">
                      {errors.selectedGrade}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <Select
                    name="curriculum"
                    options={curriculumOptions}
                    classNamePrefix="select"
                    value={formValues.selectedCurriculum}
                    onChange={(curriculum) =>
                      handleSelectorChange("selectedCurriculum", curriculum)
                    }
                    styles={customStyles}
                    placeholder="Select Curriculum"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                  {errors.selectedCurriculum && (
                    <span className="text-red-600 sm:text-base text-sm">
                      {errors.selectedCurriculum}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <button
                  className="bg-orangeHeading  mt-8 text-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-600"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default DemoForm;
