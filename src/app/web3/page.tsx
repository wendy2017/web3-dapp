import { Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NftMarketplace from "./nftMarketplace/page";

const Web3 = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 默认展示nft market */}
      <NftMarketplace />
    </div>
  );
};

export default Web3;
