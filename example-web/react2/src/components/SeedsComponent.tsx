import React, { useEffect, useState } from "react";
import { PetSimulator99API, SeedData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const SeedsComponent: React.FC = () => {
  const [seeds, setSeeds] = useState<SeedData[]>([]);

  useEffect(() => {
    const fetchSeeds = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Seeds");
      if (response.status === "ok") {
        setSeeds(response.data);
      }
    };
    fetchSeeds();
  }, []);

  return (
    <div>
      <h2>Seeds</h2>
      <ul>
        {seeds.map((seed, index) => (
          <li key={index}>
            <ImageComponent
              src={seed.configData.Icon}
              alt={seed.configData.DisplayName}
            />
            <span>{seed.configData.DisplayName}</span>
            <span>{seed.configData.Desc}</span>
            <span>Grow Time: {seed.configData.GrowTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeedsComponent;
