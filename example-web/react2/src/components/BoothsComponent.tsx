import React, { useEffect, useState } from 'react';
import {BoothData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const BoothsComponent: React.FC = () => {
  const [booths, setBooths] = useState<BoothData[]>([]);

  useEffect(() => {
    const fetchBooths = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Booths");
      if (response.status === 'ok') {
        setBooths(response.data);
      }
    };
    fetchBooths();
  }, []);

  return (
    <div>
      <h2>Booths</h2>
      <ul>
        {booths.map((booth, index) => (
          <li key={index}>
            <ImageComponent src={booth.configData.Icon} alt={booth.configData.DisplayName} />
            <span>{booth.configData.DisplayName}</span>
            <span>{booth.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoothsComponent;
