import React from "react";
import styles from "./banner.module.css";

interface IProps {
  buttonText: string;
  handleOnClick: () => void;
}

const Banner = (props: IProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffeeeeee</span>
        <span className={styles.title2}>Conneisseur</span>
      </h1>

      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
