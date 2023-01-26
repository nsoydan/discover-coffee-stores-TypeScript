import { createApi } from "unsplash-js";
import { CoffeeStoreType } from "../store/store-context";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage:9,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const getUrlOptions = (
  latLong: string | string[] ,
  query: string,
  limit: string | string[]
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};




type ResultType = {
  fsq_id: string;
  location: { address: string; neighborhood: string[] };
  name: string;
  imgUrl: string;
};


export const fetchCoffeeStores = async (
  latLong:string| string [] = "36.78647037589441,34.583124063475225",
  limit :string| string []  = "9"
  ):Promise<CoffeeStoreType[]> => {
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


  return data.results.map((result: ResultType, index: number)=> {
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
