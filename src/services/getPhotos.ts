import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { unsplashApi } from "./unsplashApi";
import { ColorId, SearchOrderBy } from "unsplash-js";
import { type } from "os";

export type TGetPhotosParams = {
  query?: string;
  page: 1;
  perPage: 20;
  color?: string;
  sort?: string;
};

export type TGetPhotosResponseType =
  | Photos
  | { results: Basic[]; total: number }
  | undefined;

export const getPhotos = async ({
  query,
  page,
  perPage,
  color,
  sort,
}: TGetPhotosParams): Promise<TGetPhotosResponseType> => {
  let apiResponse: TGetPhotosResponseType;

  if (query) {
    const { response } = await unsplashApi.search.getPhotos({
      query,
      page,
      perPage,
      color: color as ColorId,
      orderBy: sort as SearchOrderBy,
    });
    apiResponse = response;
  } else {
    const { response } = await unsplashApi.photos.list({
      page: 1,
      perPage: 20,
    });
    apiResponse = response;
  }

  return apiResponse;
};
