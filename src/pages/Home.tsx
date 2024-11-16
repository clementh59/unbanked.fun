import React from 'react';
import Header from '../components/Header';
import CurrentBalance from "@/components/CurrentBalance";
import TotalBalance from "@/components/AvailableBalance";
import TotalProfitCard from "@/components/ProfitCard";
import AllYieldChart from "@/components/YieldChart";
import NavigationBar from "@/components/NavigationBar"; // Import the navigation bar

const Home: React.FC = (): JSX.Element => {
    return (
        <div style={{ display: 'flex', backgroundColor: '#121212', color: '#ffffff' }}>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main Content */}
            <div style={{ marginLeft: '80px', flex: 1 }}>
                <Header />
                <section className="p-4">
                    <h1>Overview</h1>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <CurrentBalance target={300000} progress={15} daysRemaining={41} />
                        <TotalBalance />
                        <TotalProfitCard />
                    </div>
                </section>

                <section className="p-4">
                    <h2 style={{ marginBottom: '16px' }}>Yield Analysis</h2>
                    <AllYieldChart />
                </section>
            </div>
        </div>
    );
};

export default Home;