import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import apiService from "../../services/apiService";

const Details = () => {
    const { mediaType, id } = useParams();
    const getMovieOrShowDetails = useCallback(()=> apiService.getMovieOrShowDetailsList(mediaType, id), [mediaType, id])
    const getMovieOrShowCredits = useCallback(()=> apiService.getMovieOrShowCredits(mediaType, id), [mediaType, id])
    const { data, loading } = useFetch(getMovieOrShowDetails);
    const { data: credits, loading: creditsLoading } = useFetch(
        getMovieOrShowCredits
    );

    return (
        <div>
            <DetailsBanner video={data?.data?.results?.[0]} crew={credits?.data?.crew} />
            <Cast data={credits?.data?.cast} loading={creditsLoading} />
            <VideosSection data={data?.data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
