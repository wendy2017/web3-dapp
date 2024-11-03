"use client";

import { useState, useEffect } from "react";
//Importing Next
import Image from "next/image";
import Link from "next/link";
//Importing RainbowKit
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { projectsSources } from "./constants";

export default function NavBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="px-4 xs:px-6 md:px-8 bg-02 shadow-lg dark:bg-09">
      <nav className="flex items-center justify-between mx-auto">
        <Link href="/" target="_self" className="py-4 pr-4">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>

        <Menu>
          <MenuButton className="mx-4">
            MoodDoll Market <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            {projectsSources.map((item) => (
              <MenuItem key={item.key}>
                <Link href={item.url}>{item.name}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <div className="md:flex items-center space-x-6">
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
}
