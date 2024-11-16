import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const AddressMonitor: React.FC = ({ children }) => {
  const activeAccount = useActiveAccount();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (activeAccount?.address) {
      console.log("Address changed:", activeAccount.address);
      setKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
    }
  }, [activeAccount?.address]);

  return (
    <div key={key}>
      {children}
    </div>
  );
};

export default AddressMonitor;