import React, { FC, useCallback } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import apiService from "../../../services/apiService";

interface RecommendationProps {
  mediaType: string;
  id: string;
}

const Recommendation: FC<RecommendationProps> = ({ mediaType, id }) => {
  const getRecomendedMovieOrShow = useCallback(
    () => apiService.getRecomendedMovieOrShows(mediaType, id),
    [mediaType, id]
  );
  const { data, loading } = useFetch(getRecomendedMovieOrShow);

  return (
    <Carousel title="Recommendations" data={data?.data?.results} loading={loading} endpoint={mediaType} />
  );
};

export default Recommendation;
