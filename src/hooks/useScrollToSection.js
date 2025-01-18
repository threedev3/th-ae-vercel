import { useCallback } from "react";

// Custom hook that accepts a sections object with refs and handles smooth scrolling.
export const useScrollToSection = (sections) => {
  const handleNavClick = useCallback(
    (section) => {
      const targetRef = sections[section];

      if (targetRef && targetRef.current) {
        window.scrollTo({
          top: targetRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [sections]
  );

  return handleNavClick;
};
