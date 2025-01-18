import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

  useEffect(() => {
    const timer = setTimeout(() => {
        window.location.href = "/";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative md:py-12 py-8 sm:px-12 px-6 max-w-full overflow-x-hidden ">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-6 items-center justify-center min-h-96">
        <h1 className="xl:text-[46px] xl:leading-tight md:text-4xl sm:text-3xl text-3xl leading-none text-headingColor">
          404 - Page Not Found
        </h1>
        <p className="lg:text-xl sm:text-lg text-base text-center max-w-4xl mx-auto font-medium">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
