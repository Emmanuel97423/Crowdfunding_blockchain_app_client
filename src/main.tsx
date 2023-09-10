import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  paperWallet, } from "@thirdweb-dev/react";
import { Sepolia  } from "@thirdweb-dev/chains"
import "./styles/globals.css";

import { StateContextProvider } from "./context";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Sepolia;
const clientId = import.meta.env.clientId;

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={clientId}
      activeChain={activeChain}
       supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        // paperWallet({
        //   paperClientId: "YOUR_PAPER_CLIENT_ID",
        // }),
      ]}
    >
      <StateContextProvider >
          <App />
      </StateContextProvider>
     
    </ThirdwebProvider>
  </React.StrictMode>
);
