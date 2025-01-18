import React, { useEffect, useState } from "react";
import {
  customStyles,
  examBoard,
  gender,
  ourCurriculum,
  selectedCountries,
  subjectsOffer,
} from "../../data/data";
import useFormValidation from "../../hooks/useFormValidation";
import { PhoneInput } from "react-international-phone";
import Select from "react-select";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Country } from "country-state-city";
// import moment from "moment-timezone";

const phoneUtil = PhoneNumberUtil.getInstance();

const ParentStudentForm = ({
  currentStep,
  setCurrentStep,
  formType,
  setFormType,
}) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const { errors } = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const [parentDetails, setParentDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_1: "",
    address: "",
    // country: {
    //   label: "",
    //   value: ""
    // },
    country: "",
    city: "",
    currency: "",
    account_status: "pending",
    time_zone: {
      name: "",
      value: "",
    },
  });

  const [studentDetails, setStudentDetails] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    mobile_1: "",
    parents: [],
    dob: null,
    name_on_invoice: "",
    account_status: "pending",
    address: "",
    country: "",
    currency: "",
    time_zone: {
      name: "",
      value: "",
    },
  });

  const [subjectDetails, setSubjectDetails] = useState({
    grade_level: "",
    curriculum: "",
    exam_board: "",
    subject: "",
    course_code: "",
    exam_date: null,
  });

  const [timezones, setTimezones] = useState([]);

  const handleParentInputChange = (e) => {
    const { name, value } = e.target;
    setParentDetails((prev) => ({ ...prev, [name]: value }));
    // console.log("Parent details", parentDetails);
  };
  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubjectInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleParentPhoneChange = (phone) => {
    setParentDetails((prev) => ({ ...prev, mobile_1: phone }));
  };
  const handleStudentPhoneChange = (phone) => {
    setStudentDetails((prev) => ({ ...prev, mobile_1: phone }));
  };

  const handleParentSelectorChange = (field, { label, value }) => {
    if (field === "country") {
      const selectedCountry = Country.getCountryByCode(value);

      const countryTimezones = selectedCountry.timezones;

      const filterTimeZones = Array.from(
        countryTimezones
          .reduce((map, item) => {
            if (!map.has(item.tzName)) {
              map.set(item.tzName, {
                label: item.tzName,
                value: item.gmtOffsetName,
              });
            }
            return map;
          }, new Map())
          .values()
      );

      setTimezones(filterTimeZones);
      setParentDetails((prev) => ({
        ...prev,
        [field]: value,
        currency: selectedCountry.currency,
        time_zone: {
          name: "",
          value: "",
        },
      }));
    }

    if (field === "time_zone") {
      setParentDetails((prev) => ({
        ...prev,
        time_zone: {
          name: label,
          value,
        },
      }));
    }

    // console.log("Parent details", parentDetails);
  };

  const handleStudentSelectorChange = (field, { label, value }) => {
    if (field === "country") {
      const selectedCountry = Country.getCountryByCode(value);

      const countryTimezones = selectedCountry.timezones;

      const filterTimeZones = Array.from(
        countryTimezones
          .reduce((map, item) => {
            if (!map.has(item.tzName)) {
              map.set(item.tzName, {
                label: item.tzName,
                value: item.gmtOffsetName,
              });
            }
            return map;
          }, new Map())
          .values()
      );

      setTimezones(filterTimeZones);
      setStudentDetails((prev) => ({
        ...prev,
        [field]: value,
        currency: selectedCountry.currency,
        time_zone: {
          name: "",
          value: "",
        },
      }));
    } else if (field === "time_zone") {
      console.log("hitting");
      console.log({ Label: label, value: value });
      setStudentDetails((prev) => ({
        ...prev,
        time_zone: {
          name: label,
          value,
        },
      }));
    } else {
      setStudentDetails((prev) => ({ ...prev, [field]: value.label || value }));
    }
  };
  const handleSubjectSelectorChange = (field, value) => {
    setSubjectDetails((prev) => ({ ...prev, [field]: value.label || value }));
  };

  useEffect(() => {
    setTimezones([]);
    setParentDetails((prev) => ({
      ...prev,
      country: "",
      currency: "",
      time_zone: { name: "", value: "" },
    }));
    setStudentDetails((prev) => ({
      ...prev,
      country: "",
      currency: "",
      time_zone: { name: "", value: "" },
    }));
  }, [formType]);

  const validatePhoneNumber = () => {
    try {
      const phone =
        formType === "parent"
          ? parentDetails.mobile_1
          : studentDetails.mobile_1;
      // const country =
      //   formType === "parent" ? parentDetails.country : studentDetails.country;

      const parsedNumber = phoneUtil.parseAndKeepRawInput(
        phone,
        // country || "GB" // Default to GB if no country selected
        "gb"
      );
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (error) {
      return false;
    }
  };

  const validateStep = (step) => {
    const fieldsByStep = {
      1:
        formType === "parent"
          ? [
              "first_name",
              "last_name",
              "email",
              "mobile_1",
              "address",
              "city",
              "country",
              "time_zone",
            ]
          : [],
      2: [
        "first_name",
        "last_name",
        "gender",
        ...(formType === "student"
          ? ["email", "mobile_1", "address", "country", "time_zone"]
          : []),
      ],
      3: ["grade_level", "curriculum", "exam_board", "subject"],
    };

    // Skip validation for Step 1 in student form
    if (formType === "student" && step === 1) return true;

    const stepFields = fieldsByStep[step];
    const errorsFound = stepFields.some((field) => {
      let value;

      if (step === 1) value = parentDetails[field];
      else if (step === 2) value = studentDetails[field];
      else value = subjectDetails[field];

      // Special handling for time_zone field
      if (field === "time_zone" && (!value.name || !value.value)) {
        toast.error("Please select a valid timezone.");
        return true;
      }

      // Validate phone number for Step 1 (Parent) or Step 2 (Student)
      if (field === "mobile_1" && !validatePhoneNumber()) {
        toast.error("Please enter a valid phone number.");
        return true;
      }

      // Check for empty values, ignoring optional fields like "course_code"
      if (!value && field !== "course_code") {
        toast.error(`Please fill out the ${field.replace(/_/g, " ")} field.`);
        return true;
      }

      return false;
    });

    return !errorsFound;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (formType === "student" && currentStep === 1) {
        setCurrentStep(2); // Skip to step 2 for student form
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleValidationError = (error, entity) => {
    const htmlResponse = error.response?.data || "";
    const errorMessageStart = "Error: ";
    const errorMessageEnd = "<br>";
    const startIndex = htmlResponse.indexOf(errorMessageStart);
    const endIndex = htmlResponse.indexOf(errorMessageEnd, startIndex);

    const duplicate = htmlResponse.includes("E11000");
    const duplicateStudentEmail = htmlResponse.includes("email");

    if (duplicate || duplicateStudentEmail) {
      const isEmail = htmlResponse.includes("email");
      toast.error(
        `${
          isEmail ? "Email" : "Mobile"
        } is duplicate. Please enter a different ${
          isEmail ? "Email" : "Mobile"
        }.`
      );
    } else if (startIndex !== -1 && endIndex !== -1) {
      const errorMessage = htmlResponse.substring(
        startIndex + errorMessageStart.length,
        endIndex
      );
      toast.error(`${entity} Error: ${errorMessage}`);
    } else {
      toast.error(`Error in creating ${entity}.`);
    }
  };

  const resetForm = () => {
    setCurrentStep(formType === "parent" ? 1 : 2);
    setParentDetails({
      first_name: "",
      last_name: "",
      email: "",
      mobile_1: "",
      address: "",
      country: "",
      city: "",
      currency: "",
      account_status: "pending",
      time_zone: {
        name: "",
        value: "",
      },
    });
    setStudentDetails({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      mobile_1: "",
      parents: [],
      dob: null,
      name_on_invoice: "",
      account_status: "pending",
      address: "",
      country: "",
      currency: "",
      time_zone: {
        name: "",
        value: "",
      },
    });
    setSubjectDetails({
      grade_level: "",
      curriculum: "",
      exam_board: "",
      subject: "",
      course_code: "",
      exam_date: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 3) {
      handleNext();
    } else if (validateStep(currentStep)) {
      try {
        setIsLoading(true);
        if (formType === "parent") {
          // Submit parent details
          const parentResponse = await axios.post(
            `${BASE_URL}/parents`,
            parentDetails
          );

          console.log("Parent response", parentResponse.data.data);
          const submittedParent = parentResponse.data.data;

          // Submit student details linked to parent
          const { email, ...destructStudent } = studentDetails;

          const studentDataSubmission = {
            ...destructStudent,
            name_on_invoice: submittedParent.full_name,
            parents: [submittedParent._id],
            time_zone: submittedParent.time_zone,
            role: "child",
            courses: [subjectDetails],
          };

          const studentResponse = await axios.post(
            `${BASE_URL}/students`,
            studentDataSubmission
          );
          toast.success("Parent Account Created Successfully");

          console.log("Student response", studentResponse);
        } else {
          // Submit student details
          const studentDataSubmission = {
            ...studentDetails,
            name_on_invoice: `${studentDetails.first_name} ${studentDetails.last_name}`,
            role: "student",
            courses: [subjectDetails],
          };

          const studentResponse = await axios.post(
            `${BASE_URL}/students`,
            studentDataSubmission
          );
          toast.success("Student Account Created Successfully");

          console.log("Student response", studentResponse);
        }
        setIsLoading(false);
        // Reset Form
        resetForm();
      } catch (error) {
        setIsLoading(true);
        // Call the helper function with entity-specific messages
        const entity = formType === "parent" ? "Parent" : "Student";
        handleValidationError(error, entity);
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  const preventEnterKey = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // Fetch all countries
  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  useEffect(() => {
    console.log("Parent details", parentDetails);
    console.log("Student details", studentDetails);
    console.log("Subject details", subjectDetails);
  }, [
    handleSubjectInputChange,
    handleSubjectSelectorChange,
    handleParentInputChange,
    handleParentPhoneChange,
    handleParentSelectorChange,
    handleStudentInputChange,
    handleStudentPhoneChange,
    handleStudentSelectorChange,
  ]);

  const subjectOptions = subjectsOffer.map((subject, index) => ({
    value: subject,
    label: subject,
  }));
  const genderOptions = gender.map((gen, index) => ({
    value: gen,
    label: gen,
  }));
  const examBoardOptions = examBoard.map((exam, index) => ({
    value: exam,
    label: exam,
  }));

  const curriculumOptions = ourCurriculum.map((subject, index) => ({
    value: subject,
    label: subject,
  }));

  const grades = Array.from({ length: 13 }, (_, i) =>
    `Grade ${i + 1}`.toString()
  );
  const gradeOptions = grades
    .map((grade, index) => ({
      value: grade,
      label: grade,
    }))
    .reverse();

  const handleStepClick = (step) => {
    // Only navigate if the current step is valid or the clicked step is prior to the current step
    if (step < currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  // useEffect(() => {
  //   console.log("Parent Details", parentDetails);
  // }, [handleParentSelectorChange]);

  return (
    <div className="w-full">
      <div className="flex sm:w-[90%] w-full mx-auto">
        {/* Step Headers */}
        {(formType === "parent" ? [1, 2, 3] : [2, 3]).map((step) => (
          <div
            key={step}
            className={`sm:py-4 py-3 sm:px-8 min-[375px]:px-4 px-3 text-center cursor-pointer rounded-t-xl font-semibold sm:text-base text-sm ${
              currentStep === step ? "bg-contactBg2" : "bg-contactBg"
            }`}
            onClick={() => handleStepClick(step)}
          >
            Step {formType === "parent" ? step : step - 1}
          </div>
        ))}
      </div>
      <div className="sm:w-[90%] w-full mx-auto bg-contactBg p-8 rounded-lg rounded-tl-none shadow-lg ">
        <form
          className="transition-transform duration-500 ease-in-out "
          onSubmit={handleSubmit}
          onKeyDown={preventEnterKey}
        >
          {formType === "parent" && currentStep === 1 && (
            <div className="sm:space-y-6">
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Parent First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Parent First Name"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={parentDetails.first_name}
                    onChange={handleParentInputChange}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Parent Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Parent Last Name"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={parentDetails.last_name}
                    onChange={handleParentInputChange}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Parent Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Parent Email"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={parentDetails.email}
                    onChange={handleParentInputChange}
                  />
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Parent Mobile
                  </label>
                  <div className="py-0.5 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor">
                    <PhoneInput
                      defaultCountry="ae"
                      name="mobile_1"
                      value={parentDetails.mobile_1}
                      onChange={handleParentPhoneChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={parentDetails.address}
                    onChange={handleParentInputChange}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={parentDetails.city}
                    onChange={handleParentInputChange}
                  />
                </div>
              </div>

              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Country
                  </label>
                  <Select
                    name="country"
                    options={countries}
                    classNamePrefix="select"
                    value={
                      countries.find(
                        (option) => option.value === parentDetails.country
                      ) || ""
                    }
                    onChange={(country) =>
                      handleParentSelectorChange("country", country)
                    }
                    styles={customStyles}
                    placeholder="Select Country"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Timezone{" "}
                    <span className="font-medium text-sm">
                      (Select a country first)
                    </span>
                  </label>
                  <Select
                    name="time_zone"
                    options={timezones}
                    classNamePrefix="select"
                    value={
                      timezones.find(
                        (option) =>
                          option.value === parentDetails.time_zone.value
                      ) || ""
                    }
                    onChange={(timezone) =>
                      handleParentSelectorChange("time_zone", timezone)
                    }
                    styles={customStyles}
                    placeholder="Select Timezone"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                    isDisabled={!parentDetails.country}
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blueHeading mt-8 text-white px-6 py-2 rounded-full shadow-lg "
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="sm:space-y-6">
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Student First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Student First Name"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={studentDetails.first_name}
                    onChange={handleStudentInputChange}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Student Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Student Last Name"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={studentDetails.last_name}
                    onChange={handleStudentInputChange}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Student Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Student Email"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={studentDetails.email}
                    onChange={handleStudentInputChange}
                  />
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Student Mobile
                  </label>
                  <div className="py-0.5 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor">
                    <PhoneInput
                      defaultCountry="ae"
                      name="mobile_1"
                      value={studentDetails.mobile_1}
                      onChange={handleStudentPhoneChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Gender
                  </label>
                  <Select
                    name="gender"
                    options={genderOptions}
                    classNamePrefix="select"
                    // value={studentDetails.gender}
                    value={
                      genderOptions.find(
                        (option) => option.value === studentDetails.gender
                      ) || ""
                    }
                    onChange={(gender) =>
                      handleStudentSelectorChange("gender", gender)
                    }
                    styles={customStyles}
                    placeholder="Select Gender"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={studentDetails.dob}
                    onChange={handleStudentInputChange}
                  />
                </div>
              </div>
              {formType === "student" && (
                <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
                  <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                    <label className="font-semibold text-headingColor sm:text-base text-sm">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                      value={studentDetails.address}
                      onChange={handleStudentInputChange}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                    <label className="font-semibold text-headingColor sm:text-base text-sm">
                      Country
                    </label>
                    <Select
                      name="country"
                      options={countries}
                      classNamePrefix="select"
                      value={
                        countries.find(
                          (option) => option.value === studentDetails.country
                        ) || ""
                      }
                      onChange={(country) =>
                        handleStudentSelectorChange("country", country)
                      }
                      styles={customStyles}
                      placeholder="Select Country"
                      components={{
                        DropdownIndicator: (props) => (
                          <ChevronDownIcon className="w-5 h-5 text-black" />
                        ),
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                    <label className="font-semibold text-headingColor sm:text-base text-sm">
                      Timezone{" "}
                      <span className="font-medium text-sm">
                        (Select a country first)
                      </span>
                    </label>
                    <Select
                      name="time_zone"
                      options={timezones}
                      classNamePrefix="select"
                      value={
                        timezones.find(
                          (option) =>
                            option.value === studentDetails.time_zone.value
                        ) || ""
                      }
                      onChange={(timezone) =>
                        handleStudentSelectorChange("time_zone", timezone)
                      }
                      styles={customStyles}
                      placeholder="Select Timezone"
                      components={{
                        DropdownIndicator: (props) => (
                          <ChevronDownIcon className="w-5 h-5 text-black" />
                        ),
                      }}
                      isDisabled={!studentDetails.country}
                    />
                  </div>
                </div>
              )}

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blueHeading mt-8 text-white px-6 py-2 rounded-full shadow-lg "
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="sm:space-y-6">
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Grade Level
                  </label>
                  <Select
                    name="grade_level"
                    options={gradeOptions}
                    classNamePrefix="select"
                    // value={subjectDetails.grade_level}
                    value={
                      gradeOptions.find(
                        (option) => option.value === subjectDetails.grade_level
                      ) || ""
                    }
                    onChange={(grade) =>
                      handleSubjectSelectorChange("grade_level", grade)
                    }
                    styles={customStyles}
                    placeholder="Select Grade"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Curriculum
                  </label>
                  <Select
                    name="curriculum"
                    options={curriculumOptions}
                    classNamePrefix="select"
                    // value={subjectDetails.curriculum}
                    value={
                      curriculumOptions.find(
                        (option) => option.value === subjectDetails.curriculum
                      ) || ""
                    }
                    onChange={(curriculum) =>
                      handleSubjectSelectorChange("curriculum", curriculum)
                    }
                    styles={customStyles}
                    placeholder="Select Curriculum"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Exam Board
                  </label>
                  <Select
                    name="exam_board"
                    options={examBoardOptions}
                    classNamePrefix="select"
                    // value={subjectDetails.exam_board}
                    value={
                      examBoardOptions.find(
                        (option) => option.value === subjectDetails.exam_board
                      ) || ""
                    }
                    onChange={(exam) =>
                      handleSubjectSelectorChange("exam_board", exam)
                    }
                    styles={customStyles}
                    placeholder="Select Exam Board"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:justify-between sm:items-center flex-wrap sm:gap-8 flex flex-col ">
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Subject
                  </label>
                  <Select
                    name="subject"
                    options={subjectOptions}
                    classNamePrefix="select"
                    // value={subjectDetails.subject}
                    value={
                      subjectOptions.find(
                        (option) => option.value === subjectDetails.subject
                      ) || ""
                    }
                    onChange={(subject) =>
                      handleSubjectSelectorChange("subject", subject)
                    }
                    styles={customStyles}
                    placeholder="Select Subject"
                    components={{
                      DropdownIndicator: (props) => (
                        <ChevronDownIcon className="w-5 h-5 text-black" />
                      ),
                    }}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Course Code
                  </label>
                  <input
                    type="text"
                    name="course_code"
                    placeholder="Course Code"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={subjectDetails.course_code}
                    onChange={handleSubjectInputChange}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                  <label className="font-semibold text-headingColor sm:text-base text-sm">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    name="exam_date"
                    placeholder="Exam Date"
                    className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                    value={subjectDetails.exam_date}
                    onChange={handleSubjectInputChange}
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-orangeHeading  mt-8 text-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ParentStudentForm;
