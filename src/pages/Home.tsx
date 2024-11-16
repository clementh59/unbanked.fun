import React from "react";
import Header from '../components/Header';
import CurrentBalance from "@/components/CurrentBalance";
import TotalBalance from "@/components/AvailableBalance";
import TotalProfitCard from "@/components/ProfitCard";
import AllYieldChart from "@/components/YieldChart"; // Import the new component

const Home: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212', padding: '16px' }}> {/* Optional dark background */}
      <Header />
      <section className="p-4">
        <h1 style={{ color: '#ffffff' }}>Overview</h1>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <CurrentBalance target={300000} progress={15} daysRemaining={41} />
          <TotalBalance />
          <TotalProfitCard />
        </div>
      </section>

      {/* Add All Yield Chart Section */}
      <section className="p-4">
        <h2 style={{ color: '#ffffff', marginBottom: '16px' }}>Yield Analysis</h2>
        <AllYieldChart /> {/* Integrate the chart here */}
      </section>
    </div>
  );
};

export default Home;
