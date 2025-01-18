import React, { useState } from "react";
import { customStyles, selectedCountries } from "../../data/data";
import useFormValidation from "../../hooks/useFormValidation";
import { PhoneInput } from "react-international-phone";
import Select from "react-select";
import emailjs from "@emailjs/browser";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

const ContactUs = () => {
  const { errors, validateContactForm } = useFormValidation();

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: null,
    message: "",
    domain: "AE",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateContactForm(formValues)) {
      const templateParams = {
        domain: formValues.domain,
        fullName: formValues.fullName,
        email: formValues.email,
        phone: formValues.phone,
        city: formValues.city,
        country: formValues.country?.label || "N/A",
        message: formValues.message,
      };

      emailjs
        .send(
          import.meta.env.VITE_APP_SERVICE_ID,
          import.meta.env.VITE_APP_CONTACT_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_APP_PUBLIC_ID
        )
        .then(
          (response) => {
            toast.success("Request Submitted");
          },
          (error) => {
            toast.error("Failed to send your message. Please try again.");
          }
        );
      setFormValues({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: null,
        message: "",
      });
    } else {
      toast.error("Validation errors");
    }
  };

  const countryObjects = selectedCountries.map((country, index) => ({
    value: country,
    label: country,
  }));

  return (
    <div>
      <div className=" xl:w-[700px] lg:w-[550px] sm:w-[600px] min-[450px]:w-[400px] min-[400px]:w-[350px] w-[300px] bg-contactBg p-8 rounded-lg  shadow-lg ">
        <form
          className="transition-transform duration-500 ease-in-out "
          onSubmit={handleSubmit}
        >
          <div className="sm:space-y-6">
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.fullName}
                  </span>
                )}
              </div>
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
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
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
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
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
              </div>
            </div>
            <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-8 flex flex-col ">
              <div className="flex-1 flex flex-col gap-1 sm:mb-0 mb-3">
                <textarea
                  name="message"
                  placeholder="Any Message"
                  className="py-2 border-b-2 border-b-borderColor bg-transparent focus:outline-none focus:border-b-[3px] sm:placeholder:text-base placeholder:text-sm placeholder:text-headingColor"
                  value={formValues.message}
                  onChange={handleInputChange}
                  rows={3}
                ></textarea>
                {errors.message && (
                  <span className="text-red-600 sm:text-base text-sm">
                    {errors.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <button className="bg-blueHeading mt-8 text-white px-6 py-2 rounded-full shadow-lg ">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
