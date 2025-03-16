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
