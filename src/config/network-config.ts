import {
  DEVNET_DASHBOARD_ID,
  MAINNET_DASHBOARD_ID,
  TESTNET_DASHBOARD_ID,
} from "@/constant/sui";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  devnet: {
    url: getFullnodeUrl("devnet"),
    variables: {
      dashboardId: DEVNET_DASHBOARD_ID,
    },
  },
  testnet: {
    url: getFullnodeUrl("testnet"),
    variables: {
      dashboardId: TESTNET_DASHBOARD_ID,
    },
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
    variables: {
      dashboardId: MAINNET_DASHBOARD_ID,
    },
  },
});

export { networkConfig, useNetworkVariable };
