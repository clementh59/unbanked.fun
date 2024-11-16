import { useBalance } from '@/hooks/balanceProvider';
import React from 'react';

interface CurrentBalanceProps {
  target: number;
}

const CurrentBalance: React.FC<CurrentBalanceProps> = ({ target }) => {
  const { totalBalance } = useBalance();

  // Convert totalBalance to a number for arithmetic operations
  const totalBalanceValue = parseFloat(totalBalance) || 0; // Default to 0 if not a valid number
  const progress = (totalBalanceValue / target) * 100; // Calculate progress as a percentage

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
    borderRadius: '12px',
    padding: '20px',
    color: '#FFFFFF',
    maxWidth: '240px',
    position: 'relative', // Use a valid value for "position"
    boxShadow: '0px 10px 20px rgba(0, 163, 255, 0.3)', // Subtle card glow
    overflow: 'hidden',
  };

  const blueAuraStyle: React.CSSProperties = {
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

  const titleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#A3AED0',
    marginBottom: '8px',
    zIndex: 1,
  };

  const balanceStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '16px',
    zIndex: 1,
  };

  const progressContainerStyle: React.CSSProperties = {
    backgroundColor: '#2E3A53',
    borderRadius: '6px',
    height: '8px',
    overflow: 'hidden',
    marginBottom: '8px',
    zIndex: 1,
  };

  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#3C82F6',
    borderRadius: '6px',
  };

  const targetTextStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#A3AED0',
    marginBottom: '8px',
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      {/* Blue Aura */}
      <div style={blueAuraStyle}></div>

      <h2 style={titleStyle}>Current Balance</h2>
      <p style={balanceStyle}>${totalBalanceValue.toFixed(2)}</p>

      <div style={progressContainerStyle}>
        <div style={{ ...progressBarStyle, width: `${progress.toFixed(2)}%` }} />
      </div>

      <div style={targetTextStyle}>
        <span>{progress.toFixed(2)}% Reached</span>
        <span>Target: ${target.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CurrentBalance;