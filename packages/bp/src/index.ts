import axios, { AxiosInstance } from 'axios';

type InfoResponse = {
  version: string;
}

class BotpressModel {
  private NLU_URL: string = process.env.BP_NLU_URL;
  private api: AxiosInstance;

  constructor() {
    this.configureApi();
  }

  private configureApi() {
    this.api = axios.create({ baseURL: this.NLU_URL, responseType: 'json' });
    this.api.interceptors.response.use(async (response) => {
      return await response.data;
    });
  }

  info = async () => {
    const info: InfoResponse  = await this.api.get('/info');
    console.log(`BP version: ${info.version}`);
  };
}

export const main = async () => {
  console.log('nlu requests will be here');

  const bp = new BotpressModel();
  bp.info();
};

export const dep = () => {
  console.log('hello from bp');
};

main();
