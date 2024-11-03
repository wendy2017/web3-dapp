"use client";
import { contracts } from "@/data/contracts";
import { useStore } from "@/store/moodDollStore";
import { logError } from "@/utils/errorUtil";
import {
  mapArrayToCatObject,
  mapArrayToOfferObject,
} from "@/utils/formatArrayToObject";
import { useCallback, useMemo } from "react";
import { getContract } from "viem";
import { usePublicClient } from "wagmi";

const useReadContract = () => {
  const client = usePublicClient();
  const {
    userCats,
    setGen0Count,
    setMaxGen0Supply,
    setUserCats,
    setCatsWithoutOffer,
    setCatsOffersForMarket,
  } = useStore();

  const catInstance = useMemo(
    () =>
      client
        ? getContract({
            address: contracts.raindoll.address,
            abi: contracts.raindoll.abi,
            client,
          })
        : null,
    [client]
  );
  const marketplaceInstance = useMemo(
    () =>
      client
        ? getContract({
            address: contracts.marketplace.address,
            abi: contracts.marketplace.abi,
            client,
          })
        : null,
    [client]
  );

  const getCatsOffersForMarket = useCallback(async (address: `0x${string}`) => {
    if (!marketplaceInstance?.read.getAllTokenOnSale || !client) return;
    try {
      const offers =
        (await marketplaceInstance.read.getAllTokenOnSale()) as bigint[];
      const results = await client.multicall({
        contracts: offers.flatMap((id) => [
          { ...contracts.raindoll, functionName: "getCat", args: [Number(id)] },
          {
            ...contracts.marketplace,
            functionName: "getOffer",
            args: [Number(id)],
          },
        ]),
      });

      const catOffers: CatOffersForMarket[] = [];
      for (let i = 0; i < results.length; i += 2) {
        const catData = mapArrayToCatObject(results[i]?.result as bigint[]);
        const offerData = mapArrayToOfferObject(
          results[i + 1]?.result as OfferAbi
        );
        offerData.ownOffer = offerData.seller === address;
        catOffers.push({ catData, marketData: offerData });
      }
      console.log(33, results, catOffers);

      setCatsOffersForMarket(catOffers);
    } catch (e: unknown) {
      console.log(e);
    }
  }, []);
  const getGen0Count = useCallback(async () => {
    if (!catInstance?.read.gen0Count) return;

    try {
      const count = (await catInstance.read.gen0Count()) as number;
      setGen0Count(count);
    } catch (error: unknown) {
      logError(error);
    }
  }, [catInstance, setGen0Count]);

  const getMaxGen0Supply = useCallback(async () => {
    if (!catInstance?.read.CREATION_LIMIT_GEN0) return;

    try {
      const maxCount = (await catInstance.read.CREATION_LIMIT_GEN0()) as number;
      setMaxGen0Supply(maxCount);
    } catch (error: unknown) {
      logError(error);
      setMaxGen0Supply(0);
    }
  }, [catInstance, setMaxGen0Supply]);

  const getUserCats = useCallback(
    async (address: `0x${string}`) => {
      if (!catInstance?.read?.getCatPerOwner || !address) return;

      try {
        const amount = (await catInstance.read.getCatPerOwner([
          address,
        ])) as string[];
        const catPromises = amount.map(async (id) => {
          if (!catInstance.read.getCat) return;
          const array = (await catInstance.read.getCat?.([
            Number(id),
          ])) as bigint[];
          return mapArrayToCatObject(array);
        });

        const cats = (await Promise.all(catPromises)) as Cat[];
        setUserCats(cats);
      } catch (error: unknown) {
        logError(error);
      }
    },
    [catInstance, setUserCats]
  );
  const getCatsWithoutOffer = useCallback(async () => {
    if (!userCats || !marketplaceInstance) return;

    try {
      const offerChecks = userCats.map((cat) => {
        if (!marketplaceInstance.read.isOffer) return null;
        return marketplaceInstance.read.isOffer([
          Number(cat.indexId),
        ]) as unknown as Promise<boolean>;
      });

      const offerResults = await Promise.all(offerChecks);
      const noOffer = userCats?.filter((_, index) => !offerResults[index]);
      setCatsWithoutOffer(noOffer);
    } catch (error: unknown) {
      logError(error);
    }
  }, [userCats, marketplaceInstance, setCatsWithoutOffer]);

  const checkNftAllowance = useCallback(
    async (user: `0x${string}`) => {
      if (!catInstance?.read.isApprovedForAll) return;

      try {
        const allowance = await catInstance.read.isApprovedForAll([
          user,
          contracts.marketplace.address,
        ]);
        return allowance;
      } catch (error: unknown) {
        logError(error);
        return false;
      }
    },
    [catInstance]
  );

  return {
    getCatsOffersForMarket,
    getGen0Count,
    getMaxGen0Supply,
    getUserCats,
    getCatsWithoutOffer,
    checkNftAllowance,
  };
};

export default useReadContract;
