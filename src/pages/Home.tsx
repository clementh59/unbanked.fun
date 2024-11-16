import React from "react";
import Header from '../components/Header';
import CurrentBalance from "@/components/CurrentBalance";
import TotalBalance from "@/components/AvailableBalance";
import TotalProfitCard from "@/components/ProfitCard";
import AllYieldChart from "@/components/YieldChart";
import NavigationBar from "@/components/NavigationBar";

const Home: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex', // Flexbox layout
        minHeight: '100vh',
        backgroundColor: '#121212',
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: '80px', // Adjust for the width of the navigation bar
          padding: '16px 32px 16px 32px', // Spacing: top, right, bottom, left
        }}
      >
        <Header />
        <section style={{ paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <CurrentBalance target={300000} progress={15} daysRemaining={41} />
            <TotalProfitCard />
          </div>
        </section>

        {/* Add All Yield Chart Section */}
        <section>
          <h2 style={{ color: '#ffffff', marginBottom: '16px' }}>Yield Analysis</h2>
          <AllYieldChart />
        </section>
      </div>
    </div>
  );
};

export default Home;