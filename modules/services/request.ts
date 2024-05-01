import axios, { AxiosResponse } from 'axios';

const casperDashRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 100 * 1000,
});

casperDashRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      console.log(message);
    }

    return Promise.reject(error);
  },
);

export default casperDashRequest;
