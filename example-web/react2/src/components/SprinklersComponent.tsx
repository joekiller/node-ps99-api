import React, { useEffect, useState } from "react";
import { PetSimulator99API, SprinklerData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const SprinklersComponent: React.FC = () => {
  const [sprinklers, setSprinklers] = useState<SprinklerData[]>([]);

  useEffect(() => {
    const fetchSprinklers = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Sprinklers");
      if (response.status === "ok") {
        setSprinklers(response.data);
      }
    };
    fetchSprinklers();
  }, []);

  return (
    <div>
      <h2>Sprinklers</h2>
      <ul>
        {sprinklers.map((sprinkler, index) => (
          <li key={index}>
            <ImageComponent
              src={sprinkler.configData.Icon}
              alt={sprinkler.configData.Name}
            />
            <span>{sprinkler.configData.Name}</span>
            <span>Duration: {sprinkler.configData.Duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SprinklersComponent;
