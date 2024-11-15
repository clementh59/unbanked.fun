import React from "react";

import Layout from "@/components/Layout";
import routes from "@/routes";

import "@/index.css";


const App = (): JSX.Element => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;