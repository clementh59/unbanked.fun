import React from "react";
import Header from '../components/Header';
import CurrentBalance from "@/components/CurrentBalance";

const Home: React.FC = (): JSX.Element => {

  return (
    <div className="min-h-screen">
      <Header />
      <section className="p-4">
      <h1 style={{ color: '#ffffff' }}>Overview</h1>
      <CurrentBalance target={300000} progress={15} daysRemaining={41} />
      </section>
    </div>
  );
};

export default Home;
