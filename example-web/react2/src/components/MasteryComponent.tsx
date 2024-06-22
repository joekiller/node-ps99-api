import React, { useEffect, useState } from 'react';
import {MasteryData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const MasteryComponent: React.FC = () => {
  const [mastery, setMastery] = useState<MasteryData[]>([]);

  useEffect(() => {
    const fetchMastery = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Mastery");
      if (response.status === 'ok') {
        setMastery(response.data);
      }
    };
    fetchMastery();
  }, []);

  return (
    <div>
      <h2>Mastery</h2>
      <ul>
        {mastery.map((item, index) => (
          <li key={index}>
            <ImageComponent src={item.configData.Icon} alt={item.configData.Name} />
            <span>{item.configData.Name}</span>
            <span>{item.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MasteryComponent;
