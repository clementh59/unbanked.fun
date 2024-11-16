import React from 'react';
import { WalletMinusIcon, HomeIcon, SettingsIcon, LogoIcon } from '@/assets';

const NavigationBar: React.FC = () => {
    return (
        <div style={navContainerStyle}>
            {/* Logo Section */}
            <div style={logoContainerStyle}>
                <div style={logoStyle}>
                    <img src={LogoIcon} alt="Logo" style={logoIconStyle} />
                </div>
            </div>

            {/* Navigation Links */}
            <nav style={navLinksContainerStyle}>
                <div style={navLinkStyle}>
                    <img src={HomeIcon} alt="Home" style={{ ...iconStyle, ...activeIconStyle }} />
                </div>
                <div style={navLinkStyle}>
                    <img src={WalletMinusIcon} alt="Wallet" style={iconStyle} />
                </div>
                {/* Add more links as needed */}
            </nav>

            {/* Settings/Bottom Links */}
            <div style={bottomContainerStyle}>
                <div style={navLinkStyle}>
                    <img src={SettingsIcon} alt="Settings" style={iconStyle} />
                </div>
            </div>
        </div>
    );
};

// Styling objects
const navContainerStyle: React.CSSProperties = {
    backgroundColor: '#1C2536',
    height: '100vh',
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    zIndex: 10,
};

const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const logoStyle: React.CSSProperties = {
    backgroundColor: '#2563EB',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
};

const logoIconStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
};

const navLinksContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
};

const navLinkStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease-in-out',
    opacity: 0.6,
};

const activeIconStyle: React.CSSProperties = {
    opacity: 1, // Highlight the active icon
};

const iconStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
};

const bottomContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default NavigationBar;