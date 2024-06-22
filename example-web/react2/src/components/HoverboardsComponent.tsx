import React, { useEffect, useState } from 'react';
import {HoverboardData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const HoverboardsComponent: React.FC = () => {
  const [hoverboards, setHoverboards] = useState<HoverboardData[]>([]);

  useEffect(() => {
    const fetchHoverboards = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Hoverboards");
      if (response.status === 'ok') {
        setHoverboards(response.data);
      }
    };
    fetchHoverboards();
  }, []);

  return (
    <div>
      <h2>Hoverboards</h2>
      <ul>
        {hoverboards.map((hoverboard, index) => (
          <li key={index}>
            <ImageComponent src={hoverboard.configData.Icon} alt={hoverboard.configData.DisplayName} />
            <span>{hoverboard.configData.DisplayName}</span>
            <span>{hoverboard.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverboardsComponent;
