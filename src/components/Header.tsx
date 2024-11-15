import React, { useCallback, useRef } from 'react';
import Row from './Row';
import { createThirdwebClient } from 'thirdweb';
import { ConnectButton, useConnectedWallets } from 'thirdweb/react'
import { createWallet, inAppWallet } from "thirdweb/wallets";
import {base} from 'thirdweb/chains';
import { Wallet } from 'thirdweb/wallets'
import { useStore } from "@/hooks/useStore";
import { TypeWallet } from '@/types/types';

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];
const client = createThirdwebClient({ clientId: 'd0ce057c3d99f4415d5720cca00ac5fe' });

const Header = () => {

    const wallet = useStore((state) => state.wallet);
    const auth = useStore((state) => state.auth);
    const token = useStore((state) => state.token);
    const walletRef = useRef<Wallet | null>(null)

    const { setWallet, setAuth, setToken } = useStore();
    const connectedWallets = useConnectedWallets()

    const onConnectWallet = useCallback(
        (wallet: Wallet) => {
            walletRef.current = wallet

          if (wallet) {
            const walletState: TypeWallet = {
              id: wallet?.id || '',
              address: wallet?.getAccount()?.address || '',
              adminAddress: wallet?.getAdminAccount?.()?.address ?? '',
            }
    
            setWallet(walletState)
          }
        },
        [token],
      )

      const onLogout = async () => {
        //removeStorageWhenDisconnecting()
        await walletRef.current?.disconnect()
    
        setWallet({} as TypeWallet)
        setAuth('')
      }

  return (
    <Row className="p-4 justify-between items-center" style={{ width: '100vw' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Unbanked.fun
      </div>
      
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
    </Row>
  );
};

export default Header;