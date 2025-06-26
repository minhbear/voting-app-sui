import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { EcText } from "../shared";
import { SuiObjectData } from "@mysten/sui/client";
import { Proposal } from "@/types";
import { formatUnixTimestamp, isUnixTimeExpired } from "@/utils";
import { VoteModal } from "./vote-modal";

interface ProposalItemProps {
  id: string;
  hasVoted: boolean
}

const ProposalItem: FC<ProposalItemProps> = ({ id, hasVoted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", { id, options: { showContent: true } });

  if (isPending) return <EcText text="Loading..." isCentered />;
  if (error) return <EcText text={error.message} isError />;
  if (!dataResponse) return <EcText text="NotFound..." isCentered />;

  const proposal = parseProposal(dataResponse.data);

  if (!proposal) return <EcText text="Invalid Proposal" isError />;
  const { expirationDate } = proposal;
  const isExpired = isUnixTimeExpired(expirationDate);

  return (
    <>
      <div
        onClick={() => !isExpired && setIsModalOpen(true)}
        className={`${
          isExpired
            ? "cursor-not-allowed border-gray-600"
            : "hover:border-blue-500"
        }
          p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800  transition-colors cursor-pointer`}
      >
        <p
          className={`${
            isExpired ? "text-gray-600" : "text-gray-300"
          } text-xl font-semibold mb-2`}
        >
          {proposal.title}
        </p>
        <p className={`${isExpired ? "text-gray-600" : "text-gray-300"} `}>
          {proposal.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div
              className={`${
                isExpired ? "text-green-800" : "text-green-600"
              } flex items-center`}
            >
              <span className="mr-1">👍</span>
              {proposal.votedYesCount}
            </div>
            <div
              className={`${
                isExpired ? "text-red-800" : "text-red-600"
              } flex items-center`}
            >
              <span className="mr-1">👎</span>
              {proposal.votedNoCount}
            </div>
          </div>
          <div>
            <p
              className={`${
                isExpired ? "text-gray-600" : "text-gray-400"
              } text-sm`}
            >
              {formatUnixTimestamp(expirationDate)}
            </p>
          </div>
        </div>
      </div>
      <VoteModal
        hasVoted={hasVoted}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        proposal={proposal}
        onVote={(voteYes: boolean) => {
          console.log("🚀 ~ voteYes:", voteYes);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

function parseProposal(
  data: SuiObjectData | null | undefined
): Proposal | null {
  if (data?.content?.dataType !== "moveObject") return null;

  const {
    voted_yes_count,
    voted_no_count,
    expiration_date,
    voter_registry,
    ...rest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = data.content.fields as any;

  return {
    ...rest,
    votedNoCount: Number(voted_no_count),
    votedYesCount: Number(voted_yes_count),
    expirationDate: Number(expiration_date),
    voterRegistry: voter_registry,
  };
}

export default ProposalItem;
