import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { sortbyData } from "../../utils/Static";
import Dropdown from "../../design/Atoms/Dropdown/Dropdown";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import EmptyState from "../EmptyState/EmptyState";
import apiService from "../../services/apiService";

import {
  ExploreDataProps,
  genreProps,
  selectedSortByActionProps,
  sortByProps,
} from "../../types/Explore.types";
import { useAppSelector } from "../../hooks/useAppSelector";

let filters: any = {};

const Explore = () => {
  const [data, setData] = useState<ExploreDataProps | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState<genreProps[] | null>(null);
  const [sortby, setSortby] = useState<sortByProps | null>(null);
  const { mediaType } = useParams();
  const { genres } = useAppSelector((state) => state.home);

  const fetchInitialData = (): void => {
    setLoading(true);
    apiService.getExploreAllMovies(mediaType, 1, filters).then((res) => {
      setData(res?.data); // store full response
      setPageNum(2); // next page to fetch
      setLoading(false);
    });
  };

  const fetchNextPageData = (): void => {
    apiService.getExploreAllMovies(mediaType, pageNum, filters).then((res) => {
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
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems: any, action: selectedSortByActionProps): void => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        const genreId = selectedItems.map((g: any) => g.id).join(",");
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>

          <div className="filters">
            {/* Genre filter */}
            <Dropdown
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={[...Object.values(genres)]}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />

            {/* Sort filter */}
            <Dropdown
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Spinner for first load */}
        {loading && <Spinner initial={true} />}

        {/* Results */}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return null;
                  return <MovieCard key={index} data={item} mediaType={mediaType} />;
                })}
              </InfiniteScroll>
            ) : (
              <EmptyState title="Sorry, Results not found!" description="" height="100%" />
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
