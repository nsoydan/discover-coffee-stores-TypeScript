import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 6,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const getUrlOptions = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "36.78647037589441,34.583124063475225",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlOptions(latLong, "coffee", limit),
    options
  );
  const data = await response.json();

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      neighborhood: Array.isArray(result.location.neighborhood)
        ? result.location.neighborhood[0]
        : "",
      name: result.name,

      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
