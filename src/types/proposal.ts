import { SuiID } from "./sui";

export type Proposal = {
  id: SuiID;
  title: string;
  description: string;
  votedYesCount: number;
  votedNoCount: number;
  expirationDate: number;
  creator: string;
  voterRegistry: string[];
};

export type VoteNft = {
  id: SuiID;
  proposalId: string;
  description: string;
  name: string;
  url: string;
};
