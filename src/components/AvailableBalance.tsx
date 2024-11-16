import React from 'react';
import { triggerYieldComparator } from '../utils/otomato.util';

const AvailableBalance = () => {
    return (
        <div style={containerStyle}>
            {/* Blue Aura */}
            <div style={blueAuraStyle}></div>

            {/* Title */}
            <div style={{ marginBottom: '16px', zIndex: 1 }}>
                <span
                    style={{
                        fontSize: '14px',
                        color: '#A3AED0',
                        fontWeight: '500',
                    }}
                >
                    Available Balance
                </span>
            </div>

            {/* Balance */}
            <div style={{ zIndex: 1 }}>
                <h2
                    style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        margin: '0',
                    }}
                >
                    $2954.32
                </h2>
                <span
                    style={{
                        fontSize: '14px',
                        color: '#00D49D',
                        fontWeight: '500',
                    }}
                >
                    $64.42 (+8.64%)
                </span>
            </div>

            {/* Chain Info */}
            <div style={{ margin: '16px 0', fontSize: '14px', zIndex: 1 }}>
                <span style={{ color: '#A3AED0' }}>From 7 Chain</span>{' '}
                <a
                    href="#"
                    style={{
                        color: '#00A9F5',
                        textDecoration: 'underline',
                        fontWeight: '500',
                    }}
                >
                    See all chain
                </a>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                <button style={earnButtonStyle} onClick={() => triggerYieldComparator()}>
                    Earn <span style={{ marginLeft: '8px' }}>⬇️</span>
                </button>
                <button style={secondaryButtonStyle}>Withdraw <span style={{ marginLeft: '8px' }}>⬆️</span></button>
                <button style={secondaryButtonStyle}>Send <span style={{ marginLeft: '8px' }}>✈️</span></button>
            </div>
        </div>
    );
};

// Styling objects
const containerStyle = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
    borderRadius: '12px',
    padding: '24px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '350px',
    boxShadow: '0px 10px 20px rgba(0, 163, 255, 0.3)',
    position: 'relative',
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

const earnButtonStyle = {
    flex: 1,
    backgroundColor: '#2563EB',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const secondaryButtonStyle = {
    flex: 1,
    backgroundColor: '#2D3748',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default AvailableBalance;