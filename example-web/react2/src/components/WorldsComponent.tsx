import React, { useEffect, useState } from "react";
import { PetSimulator99API, WorldData } from "ps99-api";

const WorldsComponent: React.FC = () => {
  const [worlds, setWorlds] = useState<WorldData[]>([]);

  useEffect(() => {
    const fetchWorlds = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Worlds");
      if (response.status === "ok") {
        setWorlds(response.data);
      }
    };
    fetchWorlds();
  }, []);

  return (
    <div>
      <h2>Worlds</h2>
      <ul>
        {worlds.map((world, index) => (
          <li key={index}>
            <span>{world.configData.MapName}</span>
            <span>World Number: {world.configData.WorldNumber}</span>
            <span>Place ID: {world.configData.PlaceId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorldsComponent;
