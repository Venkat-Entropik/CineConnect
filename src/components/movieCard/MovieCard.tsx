import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { getDateFormat } from "../../utils/utilityService";
import { dataProps } from "../../types/data";

interface MovieCardProps {
  data: dataProps;
  fromSearch: boolean;
  mediaType: string;
}

const MovieCard: FC<MovieCardProps> = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={Number(data.vote_average.toFixed(1))} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">{getDateFormat(data.release_date, "MMM D, YYYY")}</span>
      </div>
    </div>
  );
};

export default MovieCard;
