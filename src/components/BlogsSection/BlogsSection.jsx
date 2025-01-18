import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogImg1, blogImg9 } from "../../assets/img/images";
import { blogs } from "../../data/data";

const BlogsSection = () => {
  return (
    <div className="relative md:py-20 py-12 sm:px-12 px-6 max-w-full min-h-[50vh]">
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col sm:gap-12 gap-8 ">
        <div>
          <h3 className="xl:text-[42px] xl:leading-tight lg:text-4xl lg:leading-tight md:text-[40px] md:leading-10 min-[540px]:text-3xl min-[346px]:text-[22px] text-[20px] font-bold tracking-wide text-headingColor capitalize text-center">
            Recent Published Blogs
          </h3>
        </div>

        <div className="flex flex-col lg:gap-8 gap-3">
          <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-3 flex flex-col gap-3 shadow-lg shadow-[#d8d8d8] rounded-xl lg:h-96">
            <div className="flex flex-col justify-between gap-6 p-10 h-full lg:order-1 order-2">
              <div>
                <h3 className="xl:text-[28px] xl:leading-tight lg:text-2xl lg:leading-tight md:text-[24px] md:leading-10 min-[540px]:text-xl min-[346px]:text-[20px] text-[20px] line-clamp-2 text-headingColor">
                  Is the American Curriculum Failing Our Students? Here's How We
                  Can Fix It
                </h3>
              </div>
              <div>
                <p className="text-headingColor text-base line-clamp-2">
                  A major factor in opportunity and social mobility, the
                  American educational system is coming under increasing
                  scrutiny. The efficiency of the American curriculum in
                  educating pupils for the twenty-first century is a subject of
                  great concern
                </p>
              </div>

              <div className="flex flex-row justify-between items-center gap-2 lg:mt-0 mt-12">
                <div>
                  <p className="text-[#5f5f5f] text-sm">May 20th 2023</p>
                </div>

                <div className="text-headingColor font-bold text-sm">
                  <Link
                    to={`/american-curriculum-failing-our-students`}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="h-full lg:order-2 order-1">
              <img
                src={blogImg1}
                alt=""
                className="md:h-full h-64 w-full object-cover rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none rounded-tl-xl"
              />
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8 md:grid md:grid-cols-2 md:gap-3 grid grid-cols-1 gap-3">
            {blogs.map((blog) => {
              return (
                <div
                  key={blog.id}
                  className="flex flex-col gap-3 shadow-lg shadow-[#d8d8d8] rounded-xl "
                >
                  <div className="h-64">
                    <img
                      src={blog.featuredImg}
                      alt=""
                      className="h-full object-cover rounded-tl-xl rounded-tr-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="text-headingColor text-xl line-clamp-2">
                      <h3>{blog.title}</h3>
                    </div>

                    <div>
                      <p className="text-headingColor text-base line-clamp-3 ">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex flex-row justify-between gap-2 items-center mt-12">
                      <div>
                        <p className="text-[#5f5f5f] text-sm">
                          {blog.publishDate}
                        </p>
                      </div>

                      <div className="text-headingColor font-bold text-sm">
                        <Link
                          to={`/${blog.slug}`}
                          target="_blank"
                          className="cursor-pointer"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-3 flex flex-col gap-3 shadow-lg shadow-[#d8d8d8] rounded-xl lg:h-96">
            <div className="flex flex-col justify-between gap-6 p-10 h-full lg:order-1 order-2 lg:w-[50%]">
              <div>
                <h3 className="xl:text-[28px] xl:leading-tight lg:text-2xl lg:leading-tight md:text-[24px] md:leading-10 min-[540px]:text-xl min-[346px]:text-[20px] text-[20px] line-clamp-2 text-headingColor">
                  Benefits of Learning Online Tuition
                </h3>
              </div>
              <div>
                <p className="text-headingColor text-base md:line-clamp-2 line-clamp-3">
                  Online tuition, also known as virtual or remote learning, has
                  become increasingly popular in recent years, and for good
                  reason. With the rise of technology, students are now able to
                  receive the same quality education from the comfort of their
                  own homes.
                </p>
              </div>

              <div className="flex flex-row justify-between items-center gap-2 lg:mt-0 mt-12">
                <div>
                  <p className="text-[#5f5f5f] text-sm">May 20th 2023</p>
                </div>

                <div className="text-headingColor font-bold text-sm">
                  <Link
                    to={`/benefits-of-learning-online-tuition`}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:h-full h-64 lg:order-2 order-1 lg:w-[50%]">
              <img
                src={blogImg9}
                alt=""
                className="h-full w-full object-cover rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none rounded-tl-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
