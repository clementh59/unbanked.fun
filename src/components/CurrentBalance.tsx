import { useBalance } from '@/hooks/balanceProvider';
import React, { useState } from 'react';
import DepositOverlay from './DepositOverlay';

interface CurrentBalanceProps {
  target: number;
}

const CurrentBalance: React.FC<CurrentBalanceProps> = ({ target }) => {
  const { totalBalance } = useBalance();
  const [showOverlay, setShowOverlay] = useState(false); // State to toggle the overlay

  const totalBalanceValue = parseFloat(totalBalance) || 0; // Default to 0 if not a valid number
  const progress = (totalBalanceValue / target) * 100; // Calculate progress as a percentage

  const handleDepositClick = () => {
    setShowOverlay(true); // Show the overlay when the button is clicked
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Hide the overlay when it's closed
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
        borderRadius: '12px',
        padding: '20px',
        color: '#FFFFFF',
        maxWidth: '240px',
        position: 'relative',
        boxShadow: '0px 10px 20px rgba(0, 163, 255, 0.3)',
        overflow: 'hidden',
      }}
    >
      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#A3AED0', marginBottom: '8px' }}>
        Current Balance
      </h2>
      <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
        ${totalBalanceValue.toFixed(2)}
      </p>

      <div
        style={{
          backgroundColor: '#2E3A53',
          borderRadius: '6px',
          height: '8px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: '#3C82F6',
            borderRadius: '6px',
            width: `${progress.toFixed(2)}%`,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.875rem',
          color: '#A3AED0',
          marginBottom: '8px',
        }}
      >
        <span>{progress.toFixed(2)}% Reached</span>
        <span>Target: ${target.toLocaleString()}</span>
      </div>

      {/* Deposit Button */}
      <button
        style={{
          backgroundColor: '#3C82F6',
    border: 'none',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginTop: '12px',
        }}
        onClick={handleDepositClick}
      >
        Deposit
      </button>

      {/* Deposit Overlay */}
      {showOverlay && (
        <DepositOverlay
          onClose={handleCloseOverlay} // Pass the close handler to the overlay
          defaultAmount={0} // Default amount for the overlay
        />
      )}
    </div>
  );
};

export default CurrentBalance;