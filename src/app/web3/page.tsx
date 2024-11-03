"use client";

import Factory from "./nftMarketplace/create/page";

const Web3 = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 默认展示nft market */}
      <Factory />
    </div>
  );
};

export default Web3;
