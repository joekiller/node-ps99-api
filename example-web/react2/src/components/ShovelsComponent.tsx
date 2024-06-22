import React, { useEffect, useState } from 'react';
import {PetSimulator99API, ShovelData} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const ShovelsComponent: React.FC = () => {
  const [shovels, setShovels] = useState<ShovelData[]>([]);

  useEffect(() => {
    const fetchShovels = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Shovels");
      if (response.status === 'ok') {
        setShovels(response.data);
      }
    };
    fetchShovels();
  }, []);

  return (
    <div>
      <h2>Shovels</h2>
      <ul>
        {shovels.map((shovel, index) => (
          <li key={index}>
            <ImageComponent src={shovel.configData.Icon} alt={shovel.configData.DisplayName} />
            <span>{shovel.configData.DisplayName}</span>
            <span>{shovel.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShovelsComponent;
