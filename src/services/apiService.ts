import { Constants } from "../utils/Constants";
import BaseService from "../utils/BaseService";

class apiService extends BaseService {
  getConfigurations = () => this.get(Constants.CONFIGURATIONS);
  getTrendingMovies = (payload: string) => this.get(`${Constants.TRENDING_MOVIES}/${payload}`);
  getPopularMoviesOrTvShows = (payload: string) => this.get(`${payload}/${Constants.POPULAR_MOVIES}`)
}

export default new apiService();
