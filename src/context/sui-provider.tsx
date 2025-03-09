"use client";

import { networkConfig } from "@/config/network-config";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";

export default function SuiProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <SuiClientProvider defaultNetwork="testnet" networks={networkConfig}>
      <WalletProvider autoConnect>{children}</WalletProvider>
    </SuiClientProvider>
  );
}
