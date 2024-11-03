import type { FC } from "react";
import classnames from "classnames";

import styles from "../styles.module.css";

interface DogHeadProps {
  getColor: (color: number) => string;
  eyePupilColor: number;
  eyePupilBeforeColor: number;
  birthmarkColor: number;
  earColor: number;
  mouthToungueColor: number;
}

export const DogHead: FC<DogHeadProps> = ({
  getColor,
  eyePupilColor,
  eyePupilBeforeColor,
  birthmarkColor,
  earColor,
  mouthToungueColor,
}) => {
  const eyePupilColorStyle = {
    background: getColor(eyePupilColor),
  };
  const eyePupilBeforeColorStyle = {
    background: getColor(eyePupilBeforeColor),
  };
  const birthmarkColorStyle = {
    background: getColor(birthmarkColor),
  };
  const earColorStyle = {
    background: getColor(earColor),
  };
  const mouthToungueColorStyle = {
    background: getColor(mouthToungueColor),
  };

  return (
    <div className={styles.dog}>
      <div className={styles.forehead}></div>
      <div className={styles.face}></div>
      <div className={styles.chin}></div>
      <div style={earColorStyle} className={styles.ear}></div>
      <div
        style={earColorStyle}
        className={classnames(styles.ear, styles.right)}
      ></div>
      <div className={styles.eye}>
        <div style={eyePupilColorStyle} className={styles.pupil}>
          <span
            style={eyePupilBeforeColorStyle}
            className={styles.pupilBefore}
          ></span>
        </div>
      </div>
      <div className={classnames(styles.eye, styles.right)}>
        <div style={eyePupilColorStyle} className={styles.pupil}>
          <span
            style={eyePupilBeforeColorStyle}
            className={styles.pupilBefore}
          ></span>
        </div>
      </div>
      <div style={birthmarkColorStyle} className={styles.birthmark}></div>
      <div className={styles.nose}>
        <div className={styles.nostril}></div>
        <div className={classnames(styles.nostril, styles.right)}></div>
      </div>
      <div className={styles.mouth}>
        <div className={styles.teen}></div>
        <div className={classnames(styles.teen, styles.right)}></div>
        <div style={mouthToungueColorStyle} className={styles.tongue}></div>
      </div>
    </div>
  );
};
