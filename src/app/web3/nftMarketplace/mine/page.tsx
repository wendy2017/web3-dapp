"use client";
import type { FC } from "react";

import { Wrap } from "@chakra-ui/react";

import Header from "@/app/(components)/Header";
import Loading from "@/app/(components)/Loading"; // TODO: Change to Loading component
import { useStore } from "@/store/moodDollStore";

import EmptyCard from "@/app/(components)/EmptyCard";
import DisplayCat from "@/app/(components)/DisplayCat";

const Mine: FC = () => {
  const { userCats } = useStore();
  console.log("userCats==", userCats);

  return (
    <>
      <Header
        title="Cats Inventory"
        description="Display all the cats NFTs that you own."
      />

      {!userCats && <Loading />}

      {userCats?.length === 0 ? (
        <EmptyCard />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto">
          {userCats?.map((cat: Cat) => {
            return (
              <DisplayCat
                key={cat.indexId}
                dnaBN={cat.genes}
                id={Number(cat.indexId)}
                generation={Number(cat.generation)}
              />
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default Mine;
