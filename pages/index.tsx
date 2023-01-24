import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner.component";
import Card from "../components/card";
//import CoffeeStore from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { StoreContext, coffeeStore } from "../store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

type Props = {
  coffeeStores: coffeeStore[];
};

export default function Home(props: Props) {
  const { handleTrackLocation, errorMessage, isFindingLocation } =
    useTrackLocation();

  const { latLong, coffeeStores, setCoffeeStores, setLatLong } =
    useContext(StoreContext);

  const [coffeeStoresError, setCoffeeStoresError] = useState(errorMessage);

  useEffect(() => {
    setLatLong(latLong);
    if (latLong) {
      try {
        const handleFetchCoffeeStore = async () => {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=6`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores.coffeeStores);
        };
        handleFetchCoffeeStore();
      } catch (error) {
        setCoffeeStoresError(error);
      }
    }
  }, [latLong]);

  const handleOnBannerButtonClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Loading" : "View stores nearby"}
          handleOnClick={handleOnBannerButtonClick}
        />
        {coffeeStoresError && (
          <div className={styles.errorMessage}>
            <p>Error :{coffeeStoresError}</p>
          </div>
        )}

        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={800} height={400} alt="" />
        </div>

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`}
                  />
                );
              })}
            </div>
          </>
        )}

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}