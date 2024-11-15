import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';

import { useStore } from "@/hooks/useStore";

const Home: React.FC = (): JSX.Element => {
  const count = useStore((state) => state.count);

  return (
    <div className="min-h-screen">
      <Header />
      <section className="p-4">
        <h1>Welcome!</h1>
        <p>Current count: {count}</p>
        <Link to="/count">Go to count page</Link>
      </section>
    </div>
  );
};

export default Home;
