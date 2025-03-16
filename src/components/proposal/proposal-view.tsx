"use client";

import { useNetworkVariable } from "@/config/network-config";
import { SuiID } from "@/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObjectData } from "@mysten/sui/client";
import ProposalItem from "./proposal-item";

const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");
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
        <ProposalItem key={id} id={id} />
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

export default ProposalView;
