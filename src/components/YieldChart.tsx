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

const AllYieldChart: React.FC = () => {
  // Generate 1000 data points dynamically
  const generateDataPoints = (base: number) => {
    return Array.from({ length: 1000 }, (_, i) => base + Math.sin(i / 100) * 10 + i / 50);
  };

  const labels = Array.from({ length: 1000 }, (_, i) => `Nov ${13 + Math.floor(i / 100)}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Morpho',
        data: generateDataPoints(50),
        borderColor: '#00A3FF',
        backgroundColor: 'rgba(0, 163, 255, 0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: 'Dataset 2',
        data: generateDataPoints(40),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: 'Dataset 3',
        data: generateDataPoints(30),
        borderColor: '#FF4500',
        backgroundColor: 'rgba(255, 69, 0, 0.2)',
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
      tooltip: {
        enabled: true,
        backgroundColor: '#1E1E2F',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#A3AED0',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#A3AED0',
        },
        max: 100,
        min: 0,
      },
    },
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #1C2536 0%, #121926 100%)',
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        padding: '20px',
      }}
    >
      {/* Aura Effect */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
          background: 'radial-gradient(circle, rgba(0, 163, 255, 0.2) 0%, rgba(0, 0, 0, 0) 80%)',
          borderRadius: '16px',
        }}
      ></div>

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