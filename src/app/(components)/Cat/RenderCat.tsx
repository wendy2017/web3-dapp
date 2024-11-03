import { memo, type FC } from "react";

import { Box, Card } from "@chakra-ui/react";

import { useAnimation } from "@/hooks/useAnimation";
import styles from "./styles.module.css";
import { getBgColorString, getColorString } from "@/utils/catsUtils";

import RenderCatInfo from "./RenderCatInfo";
import { DogHead, DogBody } from "./DogParts";

const getColor = (color: number) => `#${getColorString(color)}`;

const RenderCat: FC<RenderCatProps> = ({ dna, id, generation, isFactory }) => {
  const {
    // foreheadShape,
    // eyesShape,
    // animation,
    backgroundColor,
    eyePupilColor,
    eyePupilBeforeColor,
    birthmarkColor,
    earColor,
    mouthToungueColor,
    legColor,
    footColor,
  } = dna || {};

  // const { catAnimation } = useAnimation(animation ?? 0);

  return (
    <Card
      bgImage={getBgColorString(backgroundColor ?? 0)}
      borderRadius="10"
      w={!isFactory ? "210px" : undefined}
      h={!isFactory ? "330px" : undefined}
      className="box-shadow"
    >
      <Box className={isFactory ? styles.cat : styles.catShow} m="auto">
        <Box
        // className={
        //   animation === 2 || animation === 6
        //     ? `${styles.head} ${catAnimation.head}`
        //     : styles.head
        // }
        >
          {/* <section
            className={styles.head_background}
            style={{ backgroundColor: getColor(headColor) }}
          /> */}
          <DogHead
            getColor={getColor}
            eyePupilColor={eyePupilColor}
            eyePupilBeforeColor={eyePupilBeforeColor}
            birthmarkColor={birthmarkColor}
            earColor={earColor}
            mouthToungueColor={mouthToungueColor}
          />
        </Box>
        <DogBody
          getColor={getColor}
          legColor={legColor}
          footColor={footColor}
        />
      </Box>
      <br></br>
      <RenderCatInfo
        dna={dna}
        id={id}
        generation={generation}
        isFactory={isFactory}
      />
    </Card>
  );
};

export default memo(RenderCat);
