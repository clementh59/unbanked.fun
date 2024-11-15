import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/components/App";
import { ThirdwebProvider } from "thirdweb/react";

const container = document.getElementById("app");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <BrowserRouter>
  <ThirdwebProvider>
    <App />
  </ThirdwebProvider>
  </BrowserRouter>,
);
