import { getContractAddresses } from "./constant";
import { RAINDOLL_ABI } from "../data/abis/raindollContract_abi";
import { MARKET_ABI } from "../data/abis/marketplace_abi";

const { raindollAddress, marketplaceAddress } = getContractAddresses();

export const contracts = {
  raindoll: {
    address: raindollAddress,
    abi: RAINDOLL_ABI,
  },
  marketplace: {
    address: marketplaceAddress,
    abi: MARKET_ABI,
  },
};
