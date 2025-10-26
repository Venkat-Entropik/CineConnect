import React, { FC, useCallback } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import apiService from "../../../services/apiService";

interface SimilarProps {
  mediaType: string;
  id: string | number;
}

const Similar: FC<SimilarProps> = ({ mediaType, id }) => {
  const getSimilarMovieOrShow = useCallback(
    () => apiService.getSimilarMovieOrShows(mediaType, id),
    [mediaType, id]
  );
  const { data, loading } = useFetch(getSimilarMovieOrShow);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel title={title} data={data?.data?.results} loading={loading} endpoint={mediaType} />
  );
};

export default Similar;
