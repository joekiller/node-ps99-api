import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Clans from "./pages/Clans";
import ClanDetails from "./pages/ClanDetails";
import Enchants from "./pages/Enchants";
import { pruneOldSnapshots } from "./api";
import { seedMockData } from "./mockSeed";
import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    pruneOldSnapshots();
    seedMockData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clans" element={<Clans />} />
          <Route path="clan" element={<ClanDetails />} />
          <Route path="enchants" element={<Enchants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
