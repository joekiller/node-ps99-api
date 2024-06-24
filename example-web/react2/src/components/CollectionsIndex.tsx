import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PetSimulator99API, CollectionName } from "ps99-api";

const CollectionsIndex: React.FC = () => {
  const [collections, setCollections] = useState<CollectionName[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollections();
      if (response.status === "ok") {
        setCollections(response.data);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div>
      <h2>Collections</h2>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <Link to={`/collections/${collection}`}>{collection}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsIndex;
