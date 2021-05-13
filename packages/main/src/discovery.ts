import axios, { AxiosInstance } from 'axios';

export default class Discovery {
  private API_URL: string = process.env.TMDB_API_URL;
  private API_KEY: string = process.env.TMDB_API_KEY;

  private api: AxiosInstance;

  constructor() {
    this.configureApi();
    console.log(this.API_URL, this.API_KEY);
  }

  configureApi() {
    this.api = axios.create({ baseURL: this.API_URL, responseType: 'json' });

    this.api.interceptors.request.use((config) => {
      return { ...config, params: { ...config.params, api_key: this.API_KEY } };
    });

    this.api.interceptors.response.use(async (response) => {
      return await response.data;
    });
  }

  movie = async () => {
    // Just example now
    const movies = await this.api.get('/discover/movie?sort_by=popularity.desc');
    return movies;
  };
}
