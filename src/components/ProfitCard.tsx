import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const TotalProfitCard: React.FC = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Profit',
                data: [200, 300, 500, 800, 1000, 1200, 1500, 1700, 1900, 2200, 2500, 2800],
                borderColor: '#00A3FF',
                backgroundColor: (context: any) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 180);
                    gradient.addColorStop(0, 'rgba(0, 163, 255, 0.3)');
                    gradient.addColorStop(0.5, 'rgba(0, 163, 255, 0.1)');
                    gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
                    return gradient;
                },
                tension: 0.5, // Smooth wave effect
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        layout: {
            padding: 0, // Remove padding for the chart
        },
    };

    return (
        <div
            style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                borderRadius: '12px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FFFFFF',
                overflow: 'hidden', // Ensure no overflow issues
                position: 'relative', // For the glow effect
                boxShadow: '0px 10px 20px rgba(0, 163, 255, 0.3)', // Subtle glow for the card
            }}
        >
            {/* Blue Aura */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20px', // Position the glow below the component
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(0, 163, 255, 0.6)',
                    filter: 'blur(50px)',
                    zIndex: 0, // Ensure it stays behind the content
                }}
            ></div>

            {/* Title Section */}
            <div
                style={{
                    padding: '12px',
                    zIndex: 1, // Ensure text stays above the aura
                }}
            >
                <h3
                    style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#A3AED0',
                        marginBottom: '4px',
                    }}
                >
                    Total Profit
                </h3>
                <h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        margin: '0',
                        color: '#FFFFFF',
                    }}
                >
                    $0
                </h2>
                <p
                    style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        marginTop: '4px',
                        color: '#A3AED0',
                    }}
                >
                    Since November 2024
                </p>
            </div>

            {/* Chart Section */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    zIndex: 1, // Ensure chart stays above the aura
                }}
            >
                <Line
                    data={data}
                    options={options}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        </div>
    );
};

export default TotalProfitCard;