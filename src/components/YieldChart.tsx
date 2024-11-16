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
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend);

const AllYieldChart: React.FC = () => {
    const data = {
        labels: ['Nov 13', 'Nov 15', 'Nov 18', 'Nov 20', 'Nov 23', 'Nov 27', 'Nov 30'],
        datasets: [
            {
                label: 'Morpho',
                data: [30, 50, 70, 60, 75, 85, 90],
                borderColor: '#FFD700', // Gold color for the line
                backgroundColor: 'rgba(255, 215, 0, 0.2)', // Transparent gold for the fill
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Dataset 2',
                data: [20, 40, 60, 50, 65, 70, 80],
                borderColor: '#FF4500', // Red-Orange line
                backgroundColor: 'rgba(255, 69, 0, 0.2)', // Transparent red-orange
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Dataset 3',
                data: [10, 30, 50, 40, 55, 60, 70],
                borderColor: '#1E90FF', // Dodger blue line
                backgroundColor: 'rgba(30, 144, 255, 0.2)', // Transparent blue
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Disable the legend (can enable if needed)
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context: any) {
                        const value = context.raw;
                        return `$${value.toLocaleString()} (+${Math.round(value * 0.7)}%)`; // Example formatting
                    },
                },
                backgroundColor: '#1E1E2F', // Tooltip background color
                titleColor: '#FFFFFF', // Tooltip title text color
                bodyColor: '#FFFFFF', // Tooltip body text color
                borderColor: '#FFFFFF',
                borderWidth: 1,
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Disable x-axis grid lines
                },
                ticks: {
                    color: '#A3AED0', // Light grey for x-axis labels
                },
            },
            y: {
                grid: {
                    color: '#2D2D42', // Subtle grid lines
                },
                ticks: {
                    color: '#A3AED0', // Light grey for y-axis labels
                },
                max: 100, // 100% as max value
                min: 0, // 0% as min value
            },
        },
    };

    return (
        <div
            style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                borderRadius: '16px',
                padding: '20px',
                width: '100%',
                height: '400px', // Adjust height as needed
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ marginBottom: '16px', color: '#FFFFFF' }}>
                <h3 style={{ fontSize: '1rem', margin: 0, color: '#A3AED0' }}>All Yield</h3>
                <p style={{ fontSize: '0.875rem', margin: '4px 0', color: '#FFFFFF' }}>November 2024</p>
            </div>
            <div style={{ height: '300px' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default AllYieldChart;
