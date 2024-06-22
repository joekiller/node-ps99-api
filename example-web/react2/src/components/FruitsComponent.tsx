import React, { useEffect, useState } from 'react';
import {FruitData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const FruitsComponent: React.FC = () => {
  const [fruits, setFruits] = useState<FruitData[]>([]);

  useEffect(() => {
    const fetchFruits = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Fruits");
      if (response.status === 'ok') {
        setFruits(response.data);
      }
    };
    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            <ImageComponent src={fruit.configData.Icon} alt={fruit.configData.DisplayName} />
            <span>{fruit.configData.DisplayName}</span>
            <span>Boost: {fruit.configData.Boost.map(boost => `${boost.Amount} ${boost.Type}`).join(', ')}</span>
            <span>Duration: {fruit.configData.Duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitsComponent;
