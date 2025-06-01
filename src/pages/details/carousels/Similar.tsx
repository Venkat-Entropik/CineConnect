import React, { FC } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

interface SimilarProps {
  mediaType: string;
  id: string;
}

const Similar: FC<SimilarProps> = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return <Carousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />;
};

export default Similar;
