import Link from "next/link";
import Image from "next/image";
import { useAccount } from "wagmi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Factory from "./nftMarketplace/create";
import Factory from "./nftMarketplace/create/page";

const Web3 = () => {
  const { isConnected } = useAccount();
  console.log("isConnected==", isConnected);

  return (
    <div className="flex flex-col gap-4">
      {/* 默认展示nft market */}
      <Factory />
    </div>
  );
};

export default Web3;
