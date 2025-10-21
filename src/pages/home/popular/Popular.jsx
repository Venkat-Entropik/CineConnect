import React, { useCallback, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import apiService from "../../../services/apiService";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const popularMovieFn = useCallback(
    () => apiService.getPopularMoviesOrTvShows(endpoint),
    [endpoint]
  );

  const { data, loading } = useFetch(popularMovieFn);

  const onTabChange = tab => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
