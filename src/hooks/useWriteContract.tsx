import { useState, useMemo } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { getContract, parseEther } from "viem";

import useReadContract from "./useReadContract";
import useTransactionReceipt from "./useTransactionReceipt";
import useNotify from "./useNotify";
import { contracts } from "@/data/contracts";
import { makeStore } from "@/app/redux";
import { set } from "lodash";
import { logError } from "@/utils/errorUtil";

const useWriteContract = () => {
  const { address } = useAccount();
  const client = useWalletClient()?.data;
  const { getCatsOffersForMarket, getUserCats, getCatsWithoutOffer } =
    useReadContract();
  const { awaitTransactionReceipt } = useTransactionReceipt();
  const notify = useNotify();
  const [loading, setLoading] = useState<boolean>(false);

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

  const cancelOffer = async (id: number): Promise<void> => {
    if (!marketplaceInstance?.write.removeOffer) return;
    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.removeOffer([
        id,
      ]);
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>id: {id} has been successfully removed from the marketplace!</>
      );

      notify({
        title: "Offer removed",
        message: msg,
        status: "success",
      });
      if (address) getCatsOffersForMarket(address);
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while removing the offer.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const buyOffer = async (id: number, price: number): Promise<void> => {
    if (!marketplaceInstance?.write.buyCat) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.buyCat([id], {
        value: parseEther(price.toString()),
      });
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>Your have successfully purchased the id:{id} from the marketplace!</>
      );
      notify({
        title: "Buy Success",
        message: msg,
        status: "success",
      });
      if (address) getCatsOffersForMarket(address);
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while buying the cat.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const mintCat = async (dna: string): Promise<void> => {
    if (!catInstance?.write.createCatGen0) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.createCatGen0([dna]);

      await awaitTransactionReceipt({ hash });
      const msg = <>Your cat has been succesfully created!</>;
      notify({
        title: "Mint Successfully",
        message: msg,
        status: "success",
      });
      if (address) getUserCats(address);
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while minting.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const sellCat = async (price: bigint, id: number): Promise<void> => {
    if (!marketplaceInstance?.write.setOffer) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.setOffer([
        price,
        id,
      ]);
      await awaitTransactionReceipt({ hash });
      const msg = <>Your cat offer has been added to the marketplace!</>;
      notify({
        title: "Offer Successful",
        message: msg,
        status: "success",
      });
      getCatsWithoutOffer();
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while setting the offer.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const approveNft = async (): Promise<void> => {
    if (!catInstance?.write.setApprovalForAll) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.setApprovalForAll([
        contracts.marketplace.address,
        true,
      ]);
      await awaitTransactionReceipt({ hash });
      notify({
        title: "NFT Approval set",
        message: "Allowance successfully set.",
        status: "success",
      });
    } catch (error: unknown) {
      notify({
        title: "NFT Approval denied",
        message:
          "Something went wrong while setting the allowance. Please try again.",
        status: "error",
      });
      logError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    cancelOffer,
    buyOffer,
    mintCat,
    sellCat,
    approveNft,
  };
};
export default useWriteContract;
