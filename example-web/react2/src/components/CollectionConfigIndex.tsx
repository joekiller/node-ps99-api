import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PetSimulator99API, CollectionName } from "ps99-api";

const CollectionConfigIndex: React.FC = () => {
  const { collectionName } = useParams<{ collectionName: CollectionName }>();
  const [configNames, setConfigNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfigNames = async () => {
      if (!collectionName) return;

      const api = new PetSimulator99API();
      const response = await api.getCollection(collectionName);

      if (response.status === "ok") {
        const names = response.data.map((item) => item.configName);
        setConfigNames(names);
      } else {
        setError(response.error.message);
      }
    };

    fetchConfigNames();
  }, [collectionName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{collectionName} Configurations</h2>
      <ul>
        <li>
          <Link to={`/collections/${collectionName}/all`}>All</Link>
        </li>
        {configNames.map((configName, index) => (
          <li key={index}>
            <Link
              to={`/collections/${collectionName}/${encodeURIComponent(configName)}`}
            >
              {configName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionConfigIndex;
