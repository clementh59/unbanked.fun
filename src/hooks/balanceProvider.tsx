import React, { createContext, useContext, useEffect, useState } from 'react';
import { createThirdwebClient, getContract } from 'thirdweb';
import { getBalance } from 'thirdweb/extensions/erc20';
import { base } from 'thirdweb/chains';
import { useAddress } from "@thirdweb-dev/react";
import { useStore } from './useStore';

const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

interface BalanceContextProps {
    usdcBalance: string;
    ionUsdcBalance: string;
    aUsdcBalance: string;
    totalBalance: string;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};

const ionUSDCRate = 1 / 4.767909;

// todo: get these from the contract
// APY values for each token
const APY_RATES = {
    usdc: 0.05, // 5% APY
    ionUsdc: 0.12, // 1000% APY
    aUsdc: 0.10, // 10% APY
};

// Update interval (200ms)
const UPDATE_INTERVAL = 200;

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usdcBalance, setUsdcBalance] = useState<number>(0);
    const [ionUsdcBalance, setIonUsdcBalance] = useState<number>(0);
    const [aUsdcBalance, setAUsdcBalance] = useState<number>(0);
    const [totalBalance, setTotalBalance] = useState<number>(0);

    const address = useStore((state) => state.wallet?.address);
    console.log(address);

    const getTokenContract = (contractAddress: string) =>
        getContract({ client, chain: base, address: contractAddress });

    const fetchBalances = async () => {

        if (!address) return;

        const contracts = {
            usdc: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
            ionUsdc: '0xa900A17a49Bc4D442bA7F72c39FA2108865671f0',
            aUsdc: '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB',
        };

        try {
            // Fetch USDC balance
            const usdcContract = getTokenContract(contracts.usdc);
            if (usdcContract) {
                const { displayValue } = await getBalance({ contract: usdcContract, address });
                setUsdcBalance(Number(displayValue));
            }

            // Fetch ionUSDC balance
            const ionUsdcContract = getTokenContract(contracts.ionUsdc);
            if (ionUsdcContract) {
                const { displayValue } = await getBalance({ contract: ionUsdcContract, address });
                const adjustedValue = Number(displayValue) * ionUSDCRate;
                setIonUsdcBalance(adjustedValue);
            }

            // Fetch aUSDC balance
            const aUsdcContract = getTokenContract(contracts.aUsdc);
            if (aUsdcContract) {
                const { displayValue } = await getBalance({ contract: aUsdcContract, address });
                setAUsdcBalance(Number(displayValue));
            }
        } catch (error) {
            console.error('Error fetching balances:', error);
        }
    };

    const updateBalances = () => {
        const secondsInYear = 365 * 24 * 60 * 60;
        const incrementFactor = UPDATE_INTERVAL / 1000 / secondsInYear;

        setUsdcBalance((prev) => prev * (1 + APY_RATES.usdc * incrementFactor));
        setIonUsdcBalance((prev) => prev * (1 + APY_RATES.ionUsdc * incrementFactor));
        setAUsdcBalance((prev) => prev * (1 + APY_RATES.aUsdc * incrementFactor));
    };

    // Update total balance whenever individual balances change
    useEffect(() => {
        const total = usdcBalance + ionUsdcBalance + aUsdcBalance;
        setTotalBalance(total);
    }, [usdcBalance, ionUsdcBalance, aUsdcBalance]);

    useEffect(() => {
        if (address) {
            fetchBalances();
        }
    }, [address]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateBalances();
        }, UPDATE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <BalanceContext.Provider
            value={{
                usdcBalance: usdcBalance.toFixed(8),
                ionUsdcBalance: ionUsdcBalance.toFixed(8),
                aUsdcBalance: aUsdcBalance.toFixed(8),
                totalBalance: totalBalance.toFixed(8),
            }}
        >
            {children}
        </BalanceContext.Provider>
    );
};