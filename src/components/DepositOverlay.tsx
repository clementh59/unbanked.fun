import React, { useState } from "react";
import { createThirdwebClient, getContract, sendTransaction } from "thirdweb";
import { useActiveAccount, useConnectedWallets } from "thirdweb/react";
import { formatMoneyToNumber } from "@/utils/format.util";
import { showToast } from "@/utils/toast.util";
import { transfer } from 'thirdweb/extensions/erc20'
import { base } from "thirdweb/chains";

interface DepositOverlayProps {
    onClose: () => void;
    defaultAmount: number;
}

const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });
const SMART_WALLET_ID = 'smart'

const DepositOverlay: React.FC<DepositOverlayProps> = ({ onClose, defaultAmount }) => {
    const [usdcAmount, setUsdcAmount] = useState(defaultAmount);
    const [isLoading, setIsLoading] = useState(false); // To show loading during deposit
    const wallets = useConnectedWallets()
    const activeAccount = useActiveAccount()
    
    const getNormalAccount = () =>
        wallets.find((wallet) => wallet.id !== SMART_WALLET_ID)?.getAccount() as Account

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setUsdcAmount(isNaN(value) ? 0 : value); // Update the amount or reset to 0 if input is invalid
    };

    const handleDeposit = async () => {
        try {
            setIsLoading(true);
            const tokenContractAddress = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"; // Example USDC token address
            const depositContract = getContract({
                client,
                chain: base,
                address: tokenContractAddress,
            });

            if (!getNormalAccount().address) throw new Error("No active account found");

            const transaction = transfer({
                contract: depositContract,
                amount: formatMoneyToNumber(usdcAmount.toString()),
                to: activeAccount?.address as string,
            });

            const { transactionHash } = await sendTransaction({
                transaction,
                account: getNormalAccount(),
            });

            if (transactionHash) {
                showToast("success", "Deposit successful", "Your funds have been deposited.");
                onClose(); // Close the modal after successful transaction
            }
        } catch (error: any) {
            console.error("Deposit error:", error);
            showToast(
                "error",
                "Transaction failed",
                error?.message || "An error occurred during the deposit."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={modalTitleStyle}>Deposit in your smart account</h2>
                <p style={modalSubtitleStyle}>Enter the amount you want to deposit:</p>

                {/* Token Display */}
                <div style={tokenContainerStyle}>
                    <div style={tokenImageContainerStyle}>
                        <img
                            src="https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png"
                            alt="USDC Token"
                            style={tokenImageStyle}
                        />
                    </div>
                    <div style={tokenDetailsStyle}>
                        <input
                            type="number"
                            value={usdcAmount}
                            onChange={handleAmountChange}
                            style={inputStyle}
                            min="0"
                            step="1"
                        />
                        <p style={tokenValueStyle}>${(usdcAmount * 1).toFixed(2)}</p> {/* Assuming 1 USDC = 1 USD */}
                    </div>
                </div>

                {/* Buttons */}
                <button
                    style={continueButtonStyle}
                    onClick={handleDeposit}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? "Processing..." : "Continue"}
                </button>
                <button style={cancelButtonStyle} onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Styling objects
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: "#1C2536",
    borderRadius: "12px",
    padding: "20px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    position: "relative",
};

const modalTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: "12px",
};

const modalSubtitleStyle = {
    fontSize: "0.875rem",
    color: "#A3AED0",
    marginBottom: "20px",
};

const tokenContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#121926",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
};

const tokenImageContainerStyle = {
    width: "40px",
    height: "40px",
};

const tokenImageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
};

const tokenDetailsStyle = {
    flex: 1,
    textAlign: "right",
};

const inputStyle = {
    width: "100%",
    padding: "12px 8px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#1C2536",
    border: "2px solid #3C82F6",
    borderRadius: "8px",
    textAlign: "right",
    marginBottom: "8px",
    outline: "none",
};

const tokenValueStyle = {
    fontSize: "0.875rem",
    color: "#A3AED0",
    marginTop: "4px",
};

const continueButtonStyle = {
    backgroundColor: "#3C82F6",
    color: "#FFFFFF",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginBottom: "12px",
};

const cancelButtonStyle = {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #3C82F6",
    cursor: "pointer",
    width: "100%",
};

export default DepositOverlay;