import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useStore } from "@/hooks/useStore";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const AllYieldChart: React.FC = () => {
  const yieldData = useStore((state) => state.yield); // Use `yieldData` to avoid reserved keywords

  // Hardcoded yield data
  const generateYieldData = () => {
    return {
      aave: [8, 14, 7, 6, 7, 4, yieldData.aaveYield], // AAVE yields in percentages
      ionic: [4, 5, 6, 12, 6, 8, yieldData.ionicYield], // IONIC yields in percentages
    };
  };

  const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  const yields = generateYieldData();

  const data = {
    labels,
    datasets: [
      {
        label: "AAVE",
        data: yields.aave,
        borderColor: "#9C27B0", // Purple for AAVE
        backgroundColor: "rgba(156, 39, 176, 0.2)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: "IONIC",
        data: yields.ionic,
        borderColor: "#4CAF50", // Green for IONIC
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#1E1E2F",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
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
          color: "#A3AED0",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#A3AED0",
          callback: function (value: number) {
            return `${value}%`; // Show percentage on Y-axis
          },
        },
        max: 20, // Max value on the Y-axis
        min: 0, // Min value on the Y-axis
      },
    },
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
        borderRadius: "16px",
        boxShadow: "0px 10px 20px rgba(0, 163, 255, 0.2)",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Aura Effect */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
          background: "radial-gradient(circle, rgba(0, 163, 255, 0.2) 0%, rgba(0, 0, 0, 0) 80%)",
          borderRadius: "16px",
        }}
      ></div>

      <div style={{ marginBottom: "16px", color: "#FFFFFF" }}>
        <h3 style={{ fontSize: "1rem", margin: 0, color: "#A3AED0" }}>All Yield</h3>
        <p style={{ fontSize: "0.875rem", margin: "4px 0", color: "#FFFFFF" }}>November 2024</p>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AllYieldChart;