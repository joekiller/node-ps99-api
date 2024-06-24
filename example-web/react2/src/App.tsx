import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import CollectionsIndex from "./components/CollectionsIndex";
import CollectionConfigIndex from "./components/CollectionConfigIndex";
import DynamicCollectionConfigData from "./components/DynamicCollectionConfigData";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsIndex />} />
        <Route
          path="/collections/:collectionName"
          element={<CollectionConfigIndex />}
        />
        <Route
          path="/collections/:collectionName/:configName"
          element={<DynamicCollectionConfigData />}
        />
      </Routes>
    </Router>
  );
};

export default App;
