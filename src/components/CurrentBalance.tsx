import { useBalance } from '@/hooks/balanceProvider';
import React from 'react';

interface CurrentBalanceProps {
    target: number;
    progress: number; // Percentage value, e.g., 15 for 15%
    daysRemaining: number;
}

const CurrentBalance: React.FC<CurrentBalanceProps> = ({ target, progress, daysRemaining }) => {
    const { usdcBalance, ionUsdcBalance, aUsdcBalance, totalBalance } = useBalance();

    return (
        <div className="current-balance-container" style={containerStyle}>
            <h2 style={titleStyle}>Current Balance</h2>
            <p style={balanceStyle}>${totalBalance}</p>

            <div style={progressContainerStyle}>
                <div style={{ ...progressBarStyle, width: `${progress}%` }} />
            </div>

            <div style={targetTextStyle}>
                <span>{progress}% Reached</span>
                <span>Target: ${target.toLocaleString()}</span>
            </div>

            <p style={daysRemainingStyle}>{daysRemaining} more days to go!</p>
        </div>
    );
};

// Styling objects
const containerStyle = {
    backgroundColor: '#1C2536',
    borderRadius: '12px',
    padding: '20px',
    color: '#FFFFFF',
    maxWidth: '240px'
};

const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#A3AED0',
    marginBottom: '8px'
};

const balanceStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '16px'
};

const progressContainerStyle = {
    backgroundColor: '#2E3A53',
    borderRadius: '6px',
    height: '8px',
    overflow: 'hidden',
    marginBottom: '8px'
};

const progressBarStyle = {
    height: '100%',
    backgroundColor: '#3C82F6',
    borderRadius: '6px'
};

const targetTextStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#A3AED0',
    marginBottom: '8px'
};

const daysRemainingStyle = {
    fontSize: '0.875rem',
    color: '#A3AED0',
};

export default CurrentBalance;