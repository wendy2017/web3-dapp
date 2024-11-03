"use client";
import { type FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Card, Flex, useColorMode } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import Header from "@/app/(components)/Header";
import RenderCat from "@/app/(components)/Cat/RenderCat";
import {
  useReadContract,
  useWriteContract,
  useCatFactory,
  useWindowWidthAndHeight,
} from "@/hooks";
import { useStore } from "@/store/moodDollStore";

import Attributes from "@/app/(components)/Attributes";
import NotConnected from "@/app/(components)/NotConnected";

const Factory: FC = () => {
  const { isConnected } = useAccount();

  const { gen0Count, maxGen0Supply } = useStore();
  const { dna, updateDna, resetCatToDefault, generateRandomCat } =
    useCatFactory();
  const { getGen0Count, getMaxGen0Supply } = useReadContract();
  const { mintCat, loading } = useWriteContract();
  const { colorMode } = useColorMode();
  const { isMobile, isMediumScreen } = useWindowWidthAndHeight();

  const [notConnectedPage, setNotConnectedPage] = useState(false);

  useEffect(() => {
    getGen0Count();
    getMaxGen0Supply();
  }, [getGen0Count, getMaxGen0Supply]);

  const handleMint = async () => {
    if (!isConnected) {
      setNotConnectedPage(true);
    }
    const dnaString = Object.values(dna).join("");
    await mintCat(dnaString);
    getGen0Count();
  };

  const headerDescription = useMemo(
    () => (
      <>
        Create your custom NFT Dog from scratch! <br />(<span>{gen0Count}</span>{" "}
        out of {maxGen0Supply}!)
      </>
    ),
    [gen0Count, maxGen0Supply]
  );

  const boxWidth1 = isMobile ? 400 : isMediumScreen ? 600 : 350;
  const boxWidth2 = isMobile ? 400 : isMediumScreen ? 600 : 500;

  return notConnectedPage ? (
    <NotConnected />
  ) : (
    <>
      <Header title="Dogs Factory" description={headerDescription} />
      <Flex justify="center" m="auto" wrap={"wrap"} gap={5}>
        <Box w={boxWidth1} minW={350}>
          <RenderCat dna={dna} isFactory={true} />
          <Flex gap={2} m={"3"} justify="center">
            <Button
              colorScheme="blue"
              onClick={resetCatToDefault}
              className="box-shadow"
            >
              Default DNA
            </Button>
            <Button onClick={generateRandomCat} className="box-shadow">
              Random DNA
            </Button>
          </Flex>
        </Box>
        <Box w={boxWidth2} minW={350}>
          <Card
            bgColor={colorMode === "light" ? "#ededed" : "#4f5050"}
            borderRadius="10"
            p={5}
            className="box-shadow"
          >
            <Attributes dna={dna} updateDna={updateDna} />
          </Card>
          <Flex m={"3"} justify="flex-end">
            <Button
              colorScheme="green"
              onClick={handleMint}
              isLoading={loading}
              disabled={loading}
              className="box-shadow"
            >
              CREATE
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Factory;
