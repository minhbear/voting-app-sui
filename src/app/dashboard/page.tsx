import { ProposalView } from "@/components/proposal";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Proposal App
      </h1>
      <ProposalView />
    </div>
  );
}
