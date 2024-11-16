import { useBalance } from '@/hooks/balanceProvider';
import React from 'react';

interface CurrentBalanceProps {
    target: number;
    progress: number; // Percentage value, e.g., 15 for 15%
    daysRemaining: number;
}

const CurrentBalance: React.FC<CurrentBalanceProps> = ({ target, progress, daysRemaining }) => {
    const { totalBalance } = useBalance();

    return (
        <div style={containerStyle}>
            {/* Blue Aura */}
            <div style={blueAuraStyle}></div>

            <h2 style={titleStyle}>Current Balance</h2>
            <p style={balanceStyle}>${totalBalance}</p>

            <div style={progressContainerStyle}>
                <div style={{ ...progressBarStyle, width: `${progress}%` }} />
            </div>

            <div style={targetTextStyle}>
                <span>{progress}% Reached</span>
                <span>Target: ${target.toLocaleString()}</span>
            </div>
        </div>
    );
};

// Styling objects
const containerStyle = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
    borderRadius: '12px',
    padding: '20px',
    color: '#FFFFFF',
    maxWidth: '240px',
    position: 'relative', // For the blue aura
    boxShadow: '0px 10px 20px rgba(0, 163, 255, 0.3)', // Subtle card glow
    overflow: 'hidden',
};

const blueAuraStyle = {
    position: 'absolute',
    bottom: '-20px',
    right: '-20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(0, 163, 255, 0.6)',
    filter: 'blur(50px)',
    zIndex: 0,
};

const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#A3AED0',
    marginBottom: '8px',
    zIndex: 1, // Keep text above the aura
};

const balanceStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '16px',
    zIndex: 1,
};

const progressContainerStyle = {
    backgroundColor: '#2E3A53',
    borderRadius: '6px',
    height: '8px',
    overflow: 'hidden',
    marginBottom: '8px',
    zIndex: 1,
};

const progressBarStyle = {
    height: '100%',
    backgroundColor: '#3C82F6',
    borderRadius: '6px',
};

const targetTextStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#A3AED0',
    marginBottom: '8px',
    zIndex: 1,
};

const daysRemainingStyle = {
    fontSize: '0.875rem',
    color: '#A3AED0',
    zIndex: 1,
};

export default CurrentBalance;