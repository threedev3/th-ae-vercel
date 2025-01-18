import React, {  useState } from "react";
import Accordian from "../Accordian/Accordian";
import faqImg from "../../assets/img/faqimg.png";
import { faqs } from "../../data/data";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="sm:py-12 py-12 sm:px-12 px-6 max-w-full ">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center gap-12">
        <div className="flex flex-col gap-6 items-center text-headingColor">
          <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-2xl text-[22px] font-bold tracking-wide text-center text-headingColor">
            Frequently Asked Question
          </h3>
        </div>

        <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-12 flex flex-col items-center gap-5">
          <div className="max-w-2xl flex-1">
            {faqs.slice(0, 4).map((faq, index) => (
              <Accordian
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))}
          </div>

          <div className="lg:block hidden">
            <img src={faqImg} alt="" className="object-cover" width={450} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
