"use client";

import { WalletStatus } from "@/components/wallet/status";
import { useQuery } from "@tanstack/react-query";

export default function Wallet() {
  const { isPending, error } = useQuery({
    queryKey: ["1122"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/tanstack/query"
      );

      return await response.json();
    },
  });

  if (isPending) return "loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">Your Wallet Info</h1>
      <WalletStatus />
    </div>
  );
}
