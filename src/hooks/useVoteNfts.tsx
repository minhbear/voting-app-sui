import { useNetworkVariable } from "@/config/network-config";
import {
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";

export const useVoteNfts = () => {
  const account = useCurrentAccount();
  const packageId = useNetworkVariable("packageId");

  return useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: {
        showContent: true,
      },
      filter: {
        StructType: `${packageId}::proposal::VoteProofNFT`,
      },
    },
    {
      enabled: !!account,
    }
  );
};
