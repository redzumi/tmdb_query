import axios, { AxiosInstance } from 'axios';

type InfoResponse = {
  version: string;
};

type TrainResponse = {
  success: boolean;
  modelId: string;
};

type PredictionResponse = {};

export default class BotpressModel {
  private NLU_URL: string = process.env.BP_NLU_URL;
  private api: AxiosInstance;

  constructor() {
    this.configureApi();
  }

  private configureApi() {
    this.api = axios.create({ baseURL: this.NLU_URL, responseType: 'json' });
    this.api.defaults.headers.common['Content-Type'] = 'application/json';
    this.api.interceptors.response.use(async (response) => {
      return await response.data;
    });
  }

  info = async () => {
    const info: InfoResponse = await this.api.get('/info');
    console.log(`BP version: ${info.version}`);
  };

  train = async (trainData, password) => {
    const url = '/train';
    const data = { ...trainData, password: `${password}` };
    console.log(url, data);

    const res: TrainResponse = await this.api.post(url, data);

    if (!res.success) throw new Error('Model train error');

    return res.modelId;
  };

  predict = async (predictData, password, modelId) => {
    const url = `/predict/${modelId}`;
    const data = { ...predictData, password: `${password}` };
    console.log(url, data);

    const res = await this.api.post(url, data);
    console.log(res);
  };
}
