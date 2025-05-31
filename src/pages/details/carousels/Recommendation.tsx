import React, { FC } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

interface RecommendationProps {
  mediaType: string;
  id: string;
}

const Recommendation: FC<RecommendationProps> = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <Carousel title="Recommendations" data={data?.results} loading={loading} endpoint={mediaType} />
  );
};

export default Recommendation;
