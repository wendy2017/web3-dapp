"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { Button, HStack, Text, VStack, Wrap } from "@chakra-ui/react";

import MooddollItem from "@/app/(components)/MooddollItem";
import EmptyCard from "@/app/(components)/EmptyCard";
import Header from "@/app/(components)/Header";
import { useStore } from "@/store/moodDollStore";
import { useReadContract, useWriteContract } from "@/hooks";
import Loading from "@/app/(components)/Loading";
import NotConnected from "@/app/(components)/NotConnected";

const NftMarketplace = () => {
  const { address, isConnected } = useAccount();
  const { catsOffersForMarket } = useStore();
  const { getCatsOffersForMarket } = useReadContract();
  const { cancelOffer, buyOffer, loading } = useWriteContract();

  useEffect(() => {
    if (address) {
      getCatsOffersForMarket(address);
    }
  }, [address, getCatsOffersForMarket]);
  const handleCancel = async (id: number) => {
    await cancelOffer(id);
  };
  const handleBuy = async (id: number, price: number) => {
    await buyOffer(id, price);
  };

  return (
    <>
      <Header
        title="Mood doll  Marketplace"
        description="Display all the mood dools that are currently for sale."
      />
      {!catsOffersForMarket && <Loading />}
      {!isConnected && <NotConnected />}
      {catsOffersForMarket?.length == 0 ? (
        <EmptyCard />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto">
          {catsOffersForMarket?.map((cat: CatOffersForMarket) => {
            const id = Number(cat?.catData?.indexId);
            const price = Number(formatEther(cat?.marketData?.price || ""));

            return (
              <VStack bg={"white"} className="p-2" key={cat?.catData?.indexId}>
                <MooddollItem
                  dnaBN={cat?.catData?.genes}
                  id={id}
                  generation={Number(cat?.catData?.generation)}
                />

                <HStack gap={4}>
                  <Text
                    fontSize="lg"
                    fontWeight={700}
                    color={"black"}
                    className="text-shadow-light"
                  >
                    {price} ETH
                  </Text>
                  {cat?.marketData?.ownOffer ? (
                    <Button
                      colorScheme="red"
                      isLoading={loading}
                      onClick={() => handleCancel(price)}
                      className="box-shadow"
                    >
                      CANCEL
                    </Button>
                  ) : (
                    <Button
                      colorScheme="green"
                      isLoading={loading}
                      onClick={() => handleBuy(id, price)}
                      className="box-shadow"
                    >
                      BUY
                    </Button>
                  )}
                </HStack>
              </VStack>
            );
          })}
        </Wrap>
      )}
    </>
  );
};
export default NftMarketplace;
