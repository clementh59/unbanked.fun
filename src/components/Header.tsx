import React from 'react';
import { Line } from 'react-chartjs-2';
import Row from './Row';
import { ConnectButton, useConnectedWallets } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { base } from 'thirdweb/chains';
import { useStore } from "@/hooks/useStore";
import { shortenAddress } from 'thirdweb/utils';
import { showToast } from '@/utils/toast.util';
import { removeStorageWhenDisconnecting } from '@/utils/storage.util';
import Button from '@/components/buttons/button';

// Import icons from assets
import { SearchIcon, MoonIcon, NotificationIcon, RefreshCircleIcon, ClockIcon, IconWallet } from '@/assets';

const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
];

const Header = () => {
    const wallet = useStore((state) => state.wallet);
    const walletAddress = wallet?.address;

    return (
        <Row
            className="header-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0', // Add padding to match the page
            }}
        >
            {/* Left Section: "Overview" */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                }}
            >
                <h1 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>Overview</h1>
            </div>

            {/* Right Section: Icons and Connect Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="icon-button">
                        <img src={MoonIcon} alt="Dark Mode" style={{ width: '24px', height: '24px' }} />
                    </button>
                    <button className="icon-button">
                        <img src={NotificationIcon} alt="Notifications" style={{ width: '24px', height: '24px' }} />
                    </button>
                    <button className="icon-button">
                        <img src={RefreshCircleIcon} alt="Refresh" style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>

                {/* Connect Button */}
                <ConnectButton
                    client={client}
                    wallets={wallets}
                    chain={base}
                    connectButton={{
                        label: (
                            <Button
                                className="header-connect-group flex items-center gap-2"
                                style={{
                                    backgroundColor: '#1C2536',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                {walletAddress ? (
                                    <>
                                        <img
                                            src={IconWallet}
                                            alt="Wallet Icon"
                                            style={{ width: '16px', height: '16px', marginRight: '8px' }}
                                        />
                                        <span>{shortenAddress(walletAddress)}</span>
                                    </>
                                ) : (
                                    'Connect Wallet'
                                )}
                            </Button>
                        ),
                        className: 'header-connect-button',
                    }}
                />
            </div>
        </Row>
    );
};

export default Header;