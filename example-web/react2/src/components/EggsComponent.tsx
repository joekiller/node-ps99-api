import React, { useEffect, useState } from 'react';
import {EggData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const EggsComponent: React.FC = () => {
  const [eggs, setEggs] = useState<EggData[]>([]);

  useEffect(() => {
    const fetchEggs = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Eggs");
      if (response.status === 'ok') {
        setEggs(response.data);
      }
    };
    fetchEggs();
  }, []);

  return (
    <div>
      <h2>Eggs</h2>
      <ul>
        {eggs.map((egg, index) => (
          <li key={index}>
            <ImageComponent src={egg.configData.icon} alt={egg.configData.name} />
            <span>{egg.configData.name}</span>
            <span>Currency: {egg.configData.currency}</span>
            <span>Pets: {egg.configData.pets.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EggsComponent;
