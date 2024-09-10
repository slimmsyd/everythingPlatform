"use client";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { base, mainnet, goerli, polygon, arbitrum, optimism } from "viem/chains"; // Import more chains as needed
require('dotenv').config();

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "SYDNEY ENGINEERS",
  description:
    "metaphysical man, trapped in the 3D world remembering his self everyday",
  url: "", // origin must match your domain & subdomain
  icons: [""],
};

const chains = [mainnet, goerli, polygon, arbitrum, optimism, base] as const;
// Create wagmiConfig
const connectors = [
  coinbaseWallet({
    appName: "Web3Modal Example", // Customize app name for Coinbase Wallet
    
    // Ensure that chains are passed to the connector
  }),
];

export const config = defaultWagmiConfig({
  chains,
  connectors,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
