import { isTheSmartYieldAlreadySetUpForThisWallet, triggerYieldComparator } from "@/utils/otomato.util";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const AddressMonitor: React.FC = ({ children }) => {
  const activeAccount = useActiveAccount();
  const [key, setKey] = useState(0);

  const initOtomatoWorkflow = async () => {
    const automationIsSetUp = await isTheSmartYieldAlreadySetUpForThisWallet();
    if (!automationIsSetUp) {
      await triggerYieldComparator();
    }
  }

  useEffect(() => {
    if (activeAccount?.address) {
      console.log("Address changed:", activeAccount.address);
      setKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render

      initOtomatoWorkflow();
    }
  }, [activeAccount?.address]);



  return (
    <div key={key}>
      {children}
    </div>
  );
};

export default AddressMonitor;