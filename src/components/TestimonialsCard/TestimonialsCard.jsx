import React from "react";
import StarRating from "react-star-ratings";

const TestimonialsCard = ({ item }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-8 w-[300px] md:p-0 p-6  mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 min-h-16">
            <div
              className={`${item.circleColor} w-12 h-12 rounded-full flex-shrink-0`}
            ></div>

            <div className="flex flex-col gap-1">
              <h3 className="text-headingColor md:text-[22px] text-xl">
                {item.name}
              </h3>
              <p className="text-xs font-normal">{item.class}</p>
            </div>
          </div>
          <div className="text-headingColor  flex flex-col gap-2">
            <StarRating
              name="course-rating"
              caption="Rate your stay!"
              totalStars={5}
              starRatedColor="#FAB437"
              rating={item.stars}
              starDimension="18px"
            />
          </div>
        </div>
        <div className="text-headingColor xl:text-base text-sm min-h-32 font-medium">
          {item.review}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
