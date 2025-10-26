import { Constants } from "../utils/Constants";
import BaseService from "../utils/BaseService";

class apiService extends BaseService {
  getConfigurations = () => this.get(Constants.CONFIGURATIONS);

  getTrendingMovies = (payload: string) => this.get(`${Constants.TRENDING_MOVIES}/${payload}`);

  getPopularMoviesOrTvShows = (payload: string) =>
    this.get(`${payload}/${Constants.POPULAR_MOVIES}`);

  getTopRatedMoviesOrTvShows = (payload: string) => this.get(`${payload}/${Constants.TOP_RATED}`);

  getUpComingMovies = () => this.get(Constants.UP_COMING_MOVIES);

  getMovieOrShowDetailsList = (mediaType: string, mId: number) =>
    this.get(`${mediaType}/${mId}/${Constants.MOVIE_OR_SHOW_DETAILS}`);

  getMovieOrShowCredits = (mediaType: string, mId: number) =>
    this.get(`${mediaType}/${mId}/${Constants.MOVIE_OR_SHOW_CREDITS}`);

  getMovieOrShowDetails = (mediaType: string, mId: number) => this.get(`${mediaType}/${mId}`);

  getSimilarMovieOrShows = (mediaType: string, mId: number) =>
    this.get(`${mediaType}/${mId}/${Constants.SIMILAR_MOVIE_OR_SHOWS}`);

  getRecomendedMovieOrShows = (mediaType: string, mId: number) =>
    this.get(`${mediaType}/${mId}/${Constants.RECOMENDED_MOVIE_OR_SHOWS}`);

  getAllGenre = (payload: string) => 
    this.get(`${Constants.GENRE}/${payload}/list`)

  getExploreAllMovies = (mediaType: string, pageNumber?: number, params: object) => this.get(`${Constants.EXPLORE_MOVIES}/${mediaType}${pageNumber ? `?page=${pageNumber}` : ""}`, params)

  searchMoviesOrShows = (query: string, pageNumber: number) =>
    this.get(`${Constants.SEARCH_MOVIES}?query=${query}&page=${pageNumber}`);
}

export default new apiService();
