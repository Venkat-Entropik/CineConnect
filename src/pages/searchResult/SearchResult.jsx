import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import EmptyState from "../EmptyState/EmptyState";
import apiService from "../../services/apiService";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    apiService.searchMoviesOrShows(query, pageNum).then(res => {
      setData(res?.data); // store full response
      setPageNum(2); // next page to fetch
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    apiService.searchMoviesOrShows(query, pageNum).then(res => {
      if (res?.data?.results?.length) {
        setData((prevData) => {
          if (!prevData) return res.data;
          return {
            ...res.data,
            results: [...prevData.results, ...res.data.results],
          };
        });
        setPageNum((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return <MovieCard key={index} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <EmptyState title="Sorry, Results not found!" description="" height="100%" />
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
