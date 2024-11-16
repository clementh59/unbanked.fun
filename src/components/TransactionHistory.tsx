import { useBalance } from "@/hooks/balanceProvider";
import { useStore } from "@/hooks/useStore";
import React from "react";

const AAVE_ICON = "https://otomato-sdk-images.s3.eu-west-1.amazonaws.com/aave.png";
const IONIC_ICON = "https://otomato-sdk-images.s3.eu-west-1.amazonaws.com/ionic.jpg";

interface TransactionHistoryProps {}

const TransactionHistory: React.FC<TransactionHistoryProps> = () => {
  const { aUsdcBalance, ionUsdcBalance } = useBalance();
  const yieldData = useStore((state) => state.yield); // Use `yieldData` to avoid reserved keywords

  const parsedAUsdcBalance = parseFloat(aUsdcBalance || "0");
  const parsedIonUsdcBalance = parseFloat(ionUsdcBalance || "0");

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
        borderRadius: "12px",
        padding: "20px",
        color: "#FFFFFF",
        maxWidth: "320px",
        boxShadow: "0px 10px 20px rgba(0, 163, 255, 0.3)",
        textAlign: "center", // Center the text
      }}
    >
      <h3 style={{ fontSize: "1rem", color: "#A3AED0", marginBottom: "16px" }}>
        Portfolio Status
      </h3>

      {/* Conditional Rendering Based on Balances */}
      {parsedAUsdcBalance > 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#A3AED0" }}>
          Funds are deposited on{" "}
          <span style={{ fontWeight: "bold", display: "inline-flex", alignItems: "center" }}>
            <img
              src={AAVE_ICON}
              alt="AAVE Icon"
              style={{
                width: "1em",
                height: "1em",
                borderRadius: "50%",
                marginRight: "4px",
                verticalAlign: "middle",
              }}
            />
            AAVE
          </span>{" "}
          for{" "}
          <span style={{ fontWeight: "bold", color: "#00FF00" }}>
            {yieldData?.aaveYield?.toFixed(2) || 0}%
          </span>{" "}
          yearly
        </p>
      ) : parsedIonUsdcBalance > 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#A3AED0" }}>
          Funds are deposited on{" "}
          <span style={{ fontWeight: "bold", display: "inline-flex", alignItems: "center" }}>
            <img
              src={IONIC_ICON}
              alt="Ionic Icon"
              style={{
                width: "1em",
                height: "1em",
                borderRadius: "50%",
                marginRight: "4px",
                verticalAlign: "middle",
              }}
            />
            Ionic
          </span>{" "}
          for{" "}
          <span style={{ fontWeight: "bold", color: "#00FF00" }}>
            {yieldData?.ionicYield?.toFixed(2) || 0}%
          </span>{" "}
          yearly
        </p>
      ) : (
        <p style={{ fontSize: "0.9rem", color: "#A3AED0" }}>
          Funds are not working for you.
        </p>
      )}
    </div>
  );
};

export default TransactionHistory;