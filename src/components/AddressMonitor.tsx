import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
  addSessionKey,
  // resolveAddress,
} from "thirdweb/extensions/erc4337";
import { createThirdwebClient, getContract, sendTransaction } from "thirdweb";
import {
  isTheSmartYieldAlreadySetUpForThisWallet,
  triggerYieldComparator,
} from "@/utils/otomato.util";
import { base } from "thirdweb/chains";
import { useStore } from "@/hooks/useStore";

const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

const AddressMonitor: React.FC = ({ children }) => {
  const token = useStore((state) => state.token);
  const activeAccount = useActiveAccount();
  const [key, setKey] = useState(0);

  const initOtomatoWorkflow = async () => {

    if (!token)
      return;

    try {
      await approveTarget();
    } catch (error) {
      if (
        error.message.includes("AA10 sender already constructed") ||
        error?.response?.data?.message?.includes("AA10 sender already constructed")
      ) {
        console.warn("Target is already approved or session key is already set up.");
      } else {
        console.error("Failed to approve target:", error);
      }
    }
    

    const automationIsSetUp = await isTheSmartYieldAlreadySetUpForThisWallet(token);
    if (!automationIsSetUp) {
      await triggerYieldComparator(token);
    } else {
      console.log('automation is already set up')
    }
  };

  const approveTarget = async () => {

    if (!activeAccount) {
      console.error("No active account found");
      return;
    }

    try {
      const contract = getContract({
        address: activeAccount.address,
        chain: base, // Chain is set to base
        client,
      });

      // Add the session key
      const transaction = await addSessionKey({
        contract,
        account: activeAccount,
        sessionKeyAddress: '0x1161ca8f52914eda0ff3eb9305dfe641ba0aec11', // otomato signer
        permissions: {
          approvedTargets: [
            "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // USDC
            "0xa900A17a49Bc4D442bA7F72c39FA2108865671f0", // ionUSDC
            // "", // aUSDC
            "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5", // aave pool
          ]
        },
      });

      const sessionKey = await sendTransaction({ transaction, account: activeAccount! })
      console.log(sessionKey);

      console.log(
        "Approved targets for signer 0x1161ca8f52914eda0ff3eb9305dfe641ba0aec11"
      );
    } catch (error) {
      console.error("Failed to approve target:", error);
    }
  };

  useEffect(() => {
    if (activeAccount?.address) {
      console.log("Address changed:", activeAccount.address);
      setKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render

      initOtomatoWorkflow();
    }
  }, [activeAccount?.address, token]);

  return <div key={key}>{children}</div>;
};

export default AddressMonitor;