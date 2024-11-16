import React from 'react';
import { triggerYieldComparator } from '../utils/otomato.util';

const AvailableBalance = () => {
    return (
        <div
            style={{
                backgroundColor: '#1C2536',
                borderRadius: '16px',
                padding: '24px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '350px', // Same width as "Current Balance"
                height: '180px', // Match the height as well
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >   
            {/* Title */}
            <div style={{ marginBottom: '16px' }}>
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
            <div>
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
            <div style={{ margin: '16px 0', fontSize: '14px' }}>
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
            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    style={{
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
                    }}
                    onClick={() => {
                        triggerYieldComparator();
                    }}
                >
                    Earn <span style={{ marginLeft: '8px' }}>⬇️</span>
                </button>
                <button
                    style={{
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
                    }}
                >
                    Withdraw <span style={{ marginLeft: '8px' }}>⬆️</span>
                </button>
                <button
                    style={{
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
                    }}
                >
                    Send <span style={{ marginLeft: '8px' }}>✈️</span>
                </button>
            </div>
        </div>
    );
};

export default AvailableBalance;