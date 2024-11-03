"use client";

import type { Metadata } from "next";
import { merge } from "lodash";
import { ThemeProvider } from "next-themes";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, lightTheme, Theme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { wagmiConfig } from "@/lib/wagmiConfig";
import { ReactNode } from "react";
import { UserCatsProvider } from "./MineProvider";

const queryClient = new QueryClient();

const theme = merge(lightTheme(), {
  colors: {
    accentColor: "#FF801F",
    accentColorForeground: "#fff",
    actionButtonSecondaryBackground: "#DADDD8",
    connectButtonBackground: "#fff",
    connectButtonBackgroundError: "#fff",
    connectButtonInnerBackground: "#fff",
    connectButtonText: "#000",
    connectButtonTextError: "#FF494A",
  },
} as Theme);

export function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <ThemeProvider attribute="class">
      <ChakraProvider resetCSS>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={theme} showRecentTransactions={true}>
              <UserCatsProvider>{children}</UserCatsProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
