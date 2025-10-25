import React, { useState, useEffect, FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useAppSelector } from "../../../hooks/useAppSelector";
import apiService from "../../../services/apiService";

const HeroBanner: FC = () => {
  const [background, setBackground] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const { url } = useAppSelector(state => state.home);

  const getUpComingMovies = useCallback(()=> apiService.getUpComingMovies(), [])

  const { data, loading } = useFetch(getUpComingMovies);

  useEffect(() => {
    const bg: string =
      url.backdrop + data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  
  return (
    <div className="heroBanner" data-testid="heroBanner">
      {!loading && (
        <div className="backdrop-img" data-testid="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer" />
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={e => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
