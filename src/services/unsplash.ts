import { createApi } from "unsplash-js";

const accessKey: string = process.env.UNSPLASH_ACCESS_KEY as string;

export const unsplashApi = createApi({
  accessKey,
});
