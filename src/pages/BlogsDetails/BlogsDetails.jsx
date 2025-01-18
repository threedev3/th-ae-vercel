import React from "react";
import BlogDetailSection from "../../components/BlogDetailSection/BlogDetailSection";
import { useParams } from "react-router-dom";
import { blogsMain } from "../../data/data";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import { Helmet } from "react-helmet";

const BlogsDetails = () => {
  const { slug } = useParams();

  const blog = blogsMain.find((s) => s.slug === slug);

  if (!blog) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <Helmet>
        <title>{`${blog.title} - Tuition Highway - Online Tuition in UAE`}</title>
      </Helmet>
      <BlogDetailSection blog={blog} />
    </div>
  );
};

export default BlogsDetails;
