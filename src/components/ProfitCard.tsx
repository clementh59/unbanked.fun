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
                backgroundColor: 'rgba(0, 163, 255, 0.1)',
                tension: 0.4,
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
    };

    return (
        <div
            style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                borderRadius: '16px',
                padding: '16px',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FFFFFF',
            }}
        >
            {/* Title */}
            <div>
                <h3
                    style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#A3AED0',
                    }}
                >
                    Total Profit
                </h3>
                <h2
                    style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        margin: '8px 0',
                        color: '#FFFFFF',
                    }}
                >
                    $1023.32
                </h2>
                <p
                    style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: '#A3AED0',
                    }}
                >
                    Since February 2024
                </p>
            </div>

            {/* Line Chart */}
            <div style={{ height: '100px' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default TotalProfitCard;