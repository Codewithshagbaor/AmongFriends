import { pharosdevnet } from "@/chains/customChains";
import { createConfig, http } from "wagmi";

import { getDefaultConfig } from "connectkit";

export const config = createConfig(
    getDefaultConfig({
      // Your dApp's chains
      chains: [pharosdevnet],
      transports: {
        // You may want to use a custom RPC url here
        [pharosdevnet.id]: http(pharosdevnet.rpcUrls.default.http[0])
      },
      // Required API Keys
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  
      // Required App Info
      appName: "Among Friends",
  
      // Optional App Info
      appDescription: "Among Friends is a peer-to-peer trustless betting protocol where users create and settle wagers without third-party oracles—just human consensus.",
    })
  );
