import React, { useState, useRef, useEffect } from "react";

function Accordian({ question, answer, isOpen, onClick }) {
  const contentRef = useRef(null);
  const accordianRef = useRef(null);
  const quesRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    } else {
      contentRef.current.style.height = "0px";
    }
  }, [isOpen]);

  return (
    <div
      className="bg-faqBg p-4 mb-2 max-w-full rounded-md shadow-lg"
      ref={accordianRef}
    >
      <button
        className="flex justify-between items-center gap-10 w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <span
          className="sm:text-base text-sm text-headingColor font-bold "
          ref={quesRef}
        >
          {question}
        </span>
        <span className="">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="size-7"
              strokeWidth={2}
              stroke="#E55D20"
            >
              <path
                fillRule="evenodd"
                d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="size-7"
              strokeWidth={2}
              stroke="#E55D20"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out pr-10"
        style={{ height: "0px" }}
      >
        <p className="mt-5 text-headingColor lg:text-base text-sm">{answer}</p>
      </div>
    </div>
  );
}

export default Accordian;
