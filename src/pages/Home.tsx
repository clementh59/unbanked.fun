import React from "react";
import Header from '../components/Header';
import CurrentBalance from "@/components/CurrentBalance";
import TotalBalance from "@/components/AvailableBalance";
import TotalProfitCard from "@/components/ProfitCard";
const Home: React.FC = (): JSX.Element => {

  return (
    <div className="min-h-screen">
      <Header />
      <section className="p-4">
        <h1 style={{ color: '#ffffff' }}>Overview</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <CurrentBalance target={300000} progress={15} daysRemaining={41} />
          <TotalBalance />
          <TotalProfitCard />
        </div>
      </section>
    </div>
  );
};

export default Home;
