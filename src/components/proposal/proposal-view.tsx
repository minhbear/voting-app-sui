"use client";

import { useNetworkVariable } from "@/config/network-config";
import { SuiID, VoteNft } from "@/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import {
  PaginatedObjectsResponse,
  SuiObjectData,
  SuiObjectResponse,
} from "@mysten/sui/client";
import ProposalItem from "./proposal-item";
import { useVoteNfts } from "@/hooks/useVoteNfts";

const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");
  const { data: voteNftsRes } = useVoteNfts();
  const voteNfts = extractVoteNfts(voteNftsRes);

  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", {
    id: dashboardId,
    options: {
      showContent: true,
    },
  });

  if (isPending)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (!dataResponse)
    return <div className="text-center text-red-500">Not Found...</div>;

  return (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {getDashboardFields(dataResponse.data)?.proposal_ids.map((id) => (
        <ProposalItem key={id} id={id} hasVoted={checkVoteNfts(voteNfts, id)} />
      ))}
    </div>
  );
};

function getDashboardFields(data: SuiObjectData | null | undefined) {
  if (data?.content?.dataType !== "moveObject") return null;

  return data.content.fields as {
    id: SuiID;
    proposal_ids: string[];
  };
}

function extractVoteNfts(
  nftRes: PaginatedObjectsResponse | undefined
): VoteNft[] {
  if (nftRes?.data.length === 0) return [];

  return nftRes?.data.map((nftObj) => getVoteNft(nftObj.data)) as VoteNft[];
}

function getVoteNft(nftData: SuiObjectData | undefined | null): VoteNft {
  if (nftData?.content?.dataType !== "moveObject")
    return {
      description: "",
      id: { id: "" },
      name: "",
      proposalId: "",
      url: "",
    };

  const { proposal_id: proposalId, ...rest } = nftData.content.fields as any;

  return {
    proposalId,
    ...rest,
  };
}

function checkVoteNfts(voteNft: VoteNft[], proposalId: string) {
  if (voteNft?.length === 0) return false;
  return voteNft.some((nft) => nft.proposalId === proposalId);
}

export default ProposalView;
