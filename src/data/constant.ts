// export const isProdEnv = process.env.NODE_ENV === "production";
export const isProdEnv = false; // Bypass Netlify prod deployment

export const SUPPORTED_CHAIN = {
  mainnet: 1,
  testnet: 11155111,
};

// Sepolia Testnet
// export const RAINDOLL_CONTRACT_ADD_TEST: `0x${string}` =
//   "0x95F232Dd2E26EAaf6A48c7f95b9D5cc43ea1Da7F";
// export const MARKETPLACE_CONTRACT_ADD_TEST: `0x${string}` =
//   "0x8D4A7E6425FC02a0e62534d412BBe7A91B251d65";
export const RAINDOLL_CONTRACT_ADD_TEST: `0x${string}` =
  "0xCfA6A3690b7072D6C7720Fd4A526d09161F7df93";
export const MARKETPLACE_CONTRACT_ADD_TEST: `0x${string}` =
  "0xE9F6A5DBf88da52ac9eEa1729635a26eE35D440a";

// Ethereum Mainnet
export const RAINDOLL_CONTRACT_ADD: `0x${string}` = "0x";
export const MARKETPLACE_CONTRACT_ADD: `0x${string}` = "0x";

export const getContractAddresses = () => {
  if (isProdEnv) {
    return {
      raindollAddress: RAINDOLL_CONTRACT_ADD,
      marketplaceAddress: MARKETPLACE_CONTRACT_ADD,
    };
  } else
    return {
      raindollAddress: RAINDOLL_CONTRACT_ADD_TEST,
      marketplaceAddress: MARKETPLACE_CONTRACT_ADD_TEST,
    };
};

export const getChain = (): number => {
  if (isProdEnv) {
    return SUPPORTED_CHAIN.mainnet;
  } else {
    return SUPPORTED_CHAIN.testnet;
  }
};
