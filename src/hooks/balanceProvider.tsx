import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from "@/hooks/useStore";
import { createThirdwebClient, getContract } from 'thirdweb';
import { getBalance } from 'thirdweb/extensions/erc20';
import { base } from 'thirdweb/chains';

const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

interface BalanceContextProps {
    balance: string;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<string>('0');

    // Get address from Zustand store
    const address = useStore((state) => state.wallet?.address);

    const getTokenContract = (contractAddress: string) =>
        getContract({ client, chain: base, address: contractAddress });

    const fetchBalance = async () => {
        const contract = getTokenContract('0x833589fcd6edb6e08f4c7c32d4f71b54bda02913');
        if (contract && address) {
            const { displayValue } = await getBalance({ contract, address });
            console.log('displayValue', displayValue);
            setBalance(displayValue);
        }
    };

    useEffect(() => {
        if (address) {
            //const interval = setInterval(fetchBalance, 50);
            fetchBalance();
            //return () => clearInterval(interval);
        }
    }, [address]);

    return (
        <BalanceContext.Provider value={{ balance }}>
            {children}
        </BalanceContext.Provider>
    );
};