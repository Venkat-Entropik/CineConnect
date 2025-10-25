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
}

export default new apiService();
