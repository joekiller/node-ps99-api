import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import CollectionsIndex from "./components/CollectionsIndex";
import CollectionConfigIndex from "./components/CollectionConfigIndex";
import DynamicCollectionConfigData from "./components/DynamicCollectionConfigData";
import CollectionsLayout from "./components/CollectionsLayout";
import Footer from "./components/Footer";
import { ScrollProvider } from "./context/ScrollContext";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsIndex />} />
          <Route element={<CollectionsLayout />}>
            <Route path="/collections/:collectionName" element={<CollectionConfigIndex />} />
            <Route path="/collections/:collectionName/:configName" element={<DynamicCollectionConfigData />} />
          </Route>
        </Routes>
        <Footer />
      </ScrollProvider>
    </Router>
  );
};

export default App;
