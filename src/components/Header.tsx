import React, { useCallback, useRef } from 'react';
import Row from './Row';
import { createThirdwebClient } from 'thirdweb';
import { ConnectButton, useConnectedWallets } from 'thirdweb/react';
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { base } from 'thirdweb/chains';
import { Wallet } from 'thirdweb/wallets';
import { useStore } from "@/hooks/useStore";
import { TypeWallet } from '@/types/types';
import { apiServices } from 'otomato-sdk';
import { get } from 'lodash';
import { removeStorageWhenDisconnecting, setStorageWhenConnecting } from '@/utils/storage.util';
import { showToast } from '@/utils/toast.util';

// Import icons from assets
import { SearchIcon, MoonIcon, NotificationIcon, RefreshCircleIcon } from '@/assets';

const accessCode = '123456';

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];
const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

const Header = () => {
    const wallet = useStore((state) => state.wallet);
    const token = useStore((state) => state.token);
    const walletRef = useRef<Wallet | null>(null);

    const { setWallet, setAuth, setToken } = useStore();
    const connectedWallets = useConnectedWallets();

    const onConnectWallet = useCallback(
        async (wallet: Wallet) => {
            walletRef.current = wallet;

            if (wallet) {
                const walletState: TypeWallet = {
                    id: wallet?.id || '',
                    address: wallet?.getAccount()?.address || '',
                    adminAddress: wallet?.getAdminAccount?.()?.address ?? '',
                };

                setWallet(walletState);

                // Attempt to login
                try {
                    const payload = await onGetLoginPayload(walletState.address, base.id);
                } catch (error) {
                    showToast('error', 'Login failed', 'Unable to complete login.');
                    console.error(error);
                }
            }
        },
        [token],
    );

    const onGetLoginPayload = async (address: string, chainId: number) => {
        try {
            const payload = await apiServices.generateLoginPayload(address, chainId, accessCode);
            if (!payload?.address) throw new Error('Invalid login payload.');
            return payload;
        } catch (error) {
            const errorMessage = get(error, 'response.data.message', 'Failed to get login payload');
            showToast('error', errorMessage);
            throw error;
        }
    };

    const onLogout = async () => {
        setAuth({ token: '', lastAddressLoggedIn: wallet?.address || '' });
        removeStorageWhenDisconnecting();
        await walletRef.current?.disconnect();

        setWallet({} as TypeWallet);
        setTimeout(() => window.location.reload(), 500);
    };

    return (
        <Row className="p-4 justify-between items-center" style={{ width: '100vw', backgroundColor: '#101828', display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>
                Unbanked.fun
            </div>

            {/* Centered Icons */}
            <div className="flex items-center gap-4">
                <button className="icon-button">
                    <img src={SearchIcon} alt="Search" />
                </button>
                <button className="icon-button">
                    <img src={MoonIcon} alt="Dark Mode" />
                </button>   
                <button className="icon-button">
                    <img src={NotificationIcon} alt="Notifications" />
                </button>
                <button className="icon-button">
                    <img src={RefreshCircleIcon} alt="Settings" />
                </button>
            </div>

            {/* Wallet Info and Connect Button */}
            <div className="flex items-center gap-4">
                <span style={{ color: '#A3AED0', fontSize: '0.875rem' }}>Last update 40m ago</span>
                
                {wallet ? (
                    <div className="flex items-center gap-2 bg-[#1C2536] px-3 py-1 rounded-full">
                        <span style={{ color: '#ffffff' }}>
                            {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : ''}
                        </span>
                        <img src="/icons/user-profile.svg" alt="User Profile" className="rounded-full w-8 h-8" />
                    </div>
                ) : (
                    <ConnectButton
                        theme="dark"
                        client={client}
                        wallets={wallets}
                        chain={base}
                        accountAbstraction={{
                            chain: base,
                            sponsorGas: true,
                        }}
                        signInButton={{
                            label: 'Sign In',
                            className: 'header-sign-in-button',
                        }}
                        connectModal={{
                            title: 'Connect Wallet',
                            size: 'wide',
                            titleIcon: '',
                        }}
                        onConnect={onConnectWallet}
                        onDisconnect={onLogout}
                        showAllWallets={false}
                    />
                )}
            </div>
        </Row>
    );
};

export default Header;