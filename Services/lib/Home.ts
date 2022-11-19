import { axiosClient } from "../apiClient";
import { AxiosRequestConfig } from "axios";
import { axiosCoreClient } from "../coreClient";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export const fetchFeatureBanner = ({ config }: Prop) => {
  return axiosCoreClient.get("/feature/banner", config);
};

export const fetchHotCollections = ({ config, body }: Prop) => {
  return axiosCoreClient.get("/feature/hot", {
    ...config,
    params: {
      ...body,
    },
  });
};

export const fetchUpcomingCollections = ({ config, body }: Prop) => {
  return axiosCoreClient.get("/feature/upcoming", {
    ...config,
    params: {
      ...body,
    },
  });
};

export const fetchHotNfts = ({ config, body }: Prop) => {
  return axiosCoreClient.get("/feature/hot/template", {
    ...config,
    params: {
      ...body,
    },
  });
};
