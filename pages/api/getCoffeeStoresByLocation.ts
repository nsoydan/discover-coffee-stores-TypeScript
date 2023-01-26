import { fetchCoffeeStores } from "../../lib/coffee-stores";
import type { NextApiRequest, NextApiResponse } from 'next'

const getCoffeeStoresByLocation = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const { latLong, limit }  = req.query;

    const coffeeStores = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json({ coffeeStores });
  } catch (error) {
    console.log("There is an Error");
    res.status(500);
    res.json({ message: "Oops! Something went" });
  }

  //return
};

export default getCoffeeStoresByLocation;
