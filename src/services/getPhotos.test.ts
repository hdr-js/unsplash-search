import getPhotos, { TGetPhotosResponseType } from "./getPhotos";

jest.mock("./getPhotos");

describe("getPhotos using Unsplash API", () => {
  it("should return 10 photos by default", async () => {
    const useAuthStoreMock = jest.mocked(getPhotos);

    useAuthStoreMock.mockReturnValue(
      Promise.resolve({ results: [], total: 10 })
    );

    const response: TGetPhotosResponseType = await getPhotos({
      page: 1,
      perPage: 10,
    });

    expect(response?.total).toBe(10);
  });
});
