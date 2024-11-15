import React from "react";

import Layout from "@/components/Layout";
import routes from "@/routes";

const App = (): JSX.Element => {
  return (
    <div style={{ backgroundColor: '#1E1E2C', minHeight: '100vh' }}>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;