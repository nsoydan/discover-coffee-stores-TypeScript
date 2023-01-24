import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

type IProps = {
  href: string;
  name: string;
  imgUrl: string;
  className: string;
};

const Card = (props: IProps) => {
  return (
    <Link href={props.href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            alt={props.name}
            src={props.imgUrl}
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
