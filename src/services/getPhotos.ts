import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { unsplashApi } from "./unsplashApi";
import { ColorId, SearchOrderBy } from "unsplash-js";
import { type } from "os";

export type TGetPhotosParams = {
  query?: string;
  page?: number;
  perPage?: number;
  color?: string;
  orderBy?: string;
};

export type TGetPhotosResponseType =
  | Photos
  | { results: Basic[]; total: number }
  | undefined;
const getPhotos = async ({
  query,
  page,
  perPage,
  color,
  orderBy,
}: TGetPhotosParams): Promise<TGetPhotosResponseType> => {
  let apiResponse: TGetPhotosResponseType;

  try {
    if (query) {
      const { response, errors } = await unsplashApi.search.getPhotos({
        query,
        page,
        perPage,
        color: color as ColorId,
        orderBy: orderBy as SearchOrderBy,
      });

      apiResponse = response;
    } else {
      const { response } = await unsplashApi.photos.list({
        page,
        perPage,
      });
      apiResponse = response;
    }
  } catch (error) {
    console.log("something happend", error);
  }

  return apiResponse;
};

export default getPhotos;
