import React, { useState } from "react";
import Accordian from "../Accordian/Accordian";
import faqsImg from "../../assets/img/faqsImg.png";
import { faqs } from "../../data/data";

const AllFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="sm:py-12 py-12 sm:px-12 px-6 max-w-full ">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center gap-12">
        <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-12 flex flex-col items-center gap-5">
          <div className="max-w-2xl flex-1">
            {faqs.map((faq, index) => (
              <Accordian
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))}
          </div>

          <div className="lg:block hidden  w-auto">
            <img src={faqsImg} alt="" className="w-[450px] object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFaqs;
