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
import { shortenAddress } from 'thirdweb/utils';
import Button from '@/components/buttons/button';

// Import icons from assets
import { SearchIcon, MoonIcon, NotificationIcon, RefreshCircleIcon, ClockIcon, IconChevronDown, IconWallet } from '@/assets';

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
        <Row className="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Logo */}
            <div className="flex items-center gap-1" style={{ color: '#A3AED0', fontSize: '0.875rem' }}>
                <img src={ClockIcon} alt="Clock" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                <span>Last update 40m ago</span>
            </div>

            {/* Centered Icons in a Row */}
            <div className="flex items-center gap-4" style={{ display: 'flex', flexDirection: 'row' }}>
                <button className="icon-button">
                    <img src={MoonIcon} alt="Dark Mode" className="icon-image" />
                </button>   
                <button className="icon-button">
                    <img src={NotificationIcon} alt="Notifications" className="icon-image" />
                </button>
                <button className="icon-button">
                    <img src={RefreshCircleIcon} alt="Settings" className="icon-image" />
                </button>
            </div>

            {/* Wallet Info and Connect Button */}
            <div className="flex items-center gap-4">
                <ConnectButton
                    theme="dark"
                    client={client}
                    wallets={wallets}
                    chain={base}
                    accountAbstraction={{
                        chain: base,
                        sponsorGas: true,
                    }}
                    connectButton={{
                        label: (
                            <Button className="header-connect-group flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '8px', backgroundColor: '#1C2536' }}>
                                {wallet?.address ? (
                                    <>
                                        <img src={IconWallet} alt="wallet-icon" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                                        <span>{shortenAddress(wallet.address)}</span>
                                    </>
                                ) : (
                                    'Connect Wallet'
                                )}
                                <IconChevronDown style={{ marginLeft: '8px' }} />
                            </Button>
                        ),
                        className: 'header-connect-button',
                    }}
                    connectModal={{
                        title: 'Connect Wallet',
                        size: 'wide',
                    }}
                    onConnect={onConnectWallet}
                    onDisconnect={onLogout}
                    showAllWallets={false}
                />
            </div>
        </Row>
    );
};

export default Header;