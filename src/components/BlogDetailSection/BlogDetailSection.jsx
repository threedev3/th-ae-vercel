import React from "react";

const BlogDetailSection = ({ blog }) => {
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${blog.featuredImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-no-repeat bg-opacity-80 max-w-full h-[500px] w-full"
      ></div>
      <div className="absolute top-0 h-[500px] bg-black w-full bg-opacity-50 flex justify-center items-center md:py-12 py-8 px-6">
        <h3 className="text-white xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-[22px] text-[20px] font-extrabold max-w-4xl text-center">
          {blog.title}
        </h3>
      </div>
      <div className="relative md:py-20 py-8 sm:px-12 px-6 max-w-full min-h-[40vh]">
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-6 gap-8 ">
          {blog.content.map((section, index) => (
            <div key={index} className="blog-section flex flex-col gap-4">
              {section.heading && (
                <h2 className="sm:text-3xl text-xl font-bold text-headingColor">
                  {section.heading}
                </h2>
              )}

              {section.para &&
                section.para.map((paraContent, paraIndex) => (
                  <div key={paraIndex}>
                    {paraContent.map((textItem, textIndex) => {
                      if (textItem.type === "link") {
                        return (
                          <a
                            key={textIndex}
                            href={textItem.url}
                            className="text-orangeHeading underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {textItem.content}
                          </a>
                        );
                      } else if (textItem.type === "subHeading") {
                        return (
                          <h3 className="sm:text-xl text-lg font-semibold text-headingColor mb-2">
                            {textItem.content}
                          </h3>
                        );
                      } else if (textItem.type === "list") {
                        return (
                          <ul
                            key={textIndex}
                            className="list-disc list-inside pl-5 text-headingColor"
                          >
                            {textItem.content.map((listItem, listIndex) => (
                              <li key={listIndex} className="mb-2">
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        );
                      } else {
                        return (
                          <span
                            key={textIndex}
                            className="text-base text-headingColor"
                          >
                            {textItem.content}
                          </span>
                        );
                      }
                    })}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSection;
