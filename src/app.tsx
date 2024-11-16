import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BalanceProvider } from "@/hooks/balanceProvider";

import App from "@/components/App";
import { ThirdwebProvider } from "thirdweb/react";
import { ThirdwebProvider as ThirdProvider } from "@thirdweb-dev/react";

const container = document.getElementById("app");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <ThirdwebProvider>
    <ThirdProvider>
      <BalanceProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BalanceProvider>
    </ThirdProvider>
  </ThirdwebProvider>,
);
