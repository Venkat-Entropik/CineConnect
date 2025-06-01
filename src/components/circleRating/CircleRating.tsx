import React, { FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

interface CircleRatingProps {
  rating: number;
}

const CircleRating: FC<CircleRatingProps> = ({ rating }) => {
  return (
    <div className="circleRating" data-testid="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={String(rating)}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
