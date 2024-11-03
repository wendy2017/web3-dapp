import type { FC } from "react";
import classnames from "classnames";

import styles from "../styles.module.css";

interface DogBodyProps {
  getColor: (color: number) => string;
  legColor: number;
  footColor: number;
}
export const DogBody: FC<DogBodyProps> = ({
  getColor,
  legColor,
  footColor,
}) => {
  const legColorStyle = {
    background: getColor(legColor),
  };
  const footColorStyle = {
    background: getColor(footColor),
  };
  return (
    <div className={styles.body}>
      <div className={styles.arm}></div>
      <div className={classnames(styles.arm, styles.right)}></div>
      <div style={legColorStyle} className={styles.leg}>
        <div style={footColorStyle} className={styles.foot}></div>
      </div>
      <div
        style={legColorStyle}
        className={classnames(styles.leg, styles.right)}
      >
        <div style={footColorStyle} className={styles.foot}></div>
      </div>
      <div className={styles.belly}></div>
    </div>
  );
};
