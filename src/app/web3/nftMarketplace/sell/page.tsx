"use client";
import { type FC, useState } from "react";

import {
  Button,
  Center,
  FormLabel,
  HStack,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

import Header from "@/app/(components)/Header";
import Loading from "@/app/(components)/Loading";
import CatSelection from "@/app/(components)/CatSelection";
import EmptyCard from "@/app/(components)/EmptyCard";
import PriceInput from "@/app/(components)/PriceInput";
import NotConnected from "@/app/(components)/NotConnected";

import useSellCat from "@/hooks/useSellCat";
import { useStore } from "@/store/moodDollStore";

const Sell: FC = () => {
  const { isConnected } = useAccount();

  const { catsWithoutOffer } = useStore();
  const { handleSell, loading } = useSellCat();
  const [catToSell, setCatToSell] = useState<SelectedCat>();
  const [price, setPrice] = useState<string>("0");

  const handleReset = async () => {
    setCatToSell(undefined);
    setPrice("0");
  };

  const onSell = async () => {
    if (catToSell) {
      await handleSell(price, catToSell.id);
      handleReset();
    }
  };
  if (!isConnected) {
    return <NotConnected />;
  }
  return (
    <>
      <Header
        title="Sell your cats"
        description="Select a cat and enter a price to add an offer to the marketplace."
      />

      {!catsWithoutOffer && <Loading />}

      {catsWithoutOffer?.length === 0 && <EmptyCard />}

      {catsWithoutOffer && catsWithoutOffer.length > 0 && (
        <Center>
          <Wrap>
            <CatSelection
              cat={catToSell}
              setCat={setCatToSell}
              name="a cat to sell"
              loading={loading}
              isMarket={true}
            />

            <VStack w={350} justifyContent="center">
              <FormLabel>Set the price in ETH:</FormLabel>
              <PriceInput price={price} setPrice={setPrice} loading={loading} />
              <HStack>
                <Button
                  colorScheme="red"
                  onClick={handleReset}
                  isLoading={loading}
                  className="box-shadow"
                >
                  Reset
                </Button>
                <Button
                  disabled={!catToSell || loading}
                  onClick={onSell}
                  isLoading={loading}
                  className="box-shadow bg-blue-300 color-white"
                >
                  Sell
                </Button>
              </HStack>
            </VStack>
          </Wrap>
        </Center>
      )}
    </>
  );
};

export default Sell;
