import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/interceptor";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

import { sortbyData } from "../../utils/Static";
import Dropdown from "../../design/Atoms/Dropdown/Dropdown";
import {
  ExploreDataProps,
  genreProps,
  selectedSortByActionProps,
  sortByProps,
} from "../../types/Explore";
import EmptyState from "../EmptyState/EmptyState";

let filters = {};

const Explore = () => {
  const [data, setData] = useState<ExploreDataProps | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState<genreProps[] | null>(null);
  const [sortby, setSortby] = useState<sortByProps | null>(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = (): void => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then(res => {
      setData(res);
      setPageNum(prev => prev + 1);
      setLoading(false);
    });
  };

  console.log("data", data, genre, sortby);

  const fetchNextPageData = (): void => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(res => {
      if (data && data.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum(prev => prev + 1);
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

  const onChange = (selectedItems: sortByProps, action: selectedSortByActionProps): void => {
    console.log("selected", selectedItems, action);
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
        let genreId = selectedItems.map(g => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
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
            <Dropdown
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
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
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
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
