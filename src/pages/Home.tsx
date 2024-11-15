import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';

const Home: React.FC = (): JSX.Element => {

  return (
    <div className="min-h-screen">
      <Header />
      <section className="p-4">
        <h1>Overview</h1>
        <Link to="/count">Go to count page</Link>
      </section>
    </div>
  );
};

export default Home;
