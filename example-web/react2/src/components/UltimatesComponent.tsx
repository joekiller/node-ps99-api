import React, { useEffect, useState } from "react";
import { PetSimulator99API, UltimateData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const UltimatesComponent: React.FC = () => {
  const [ultimates, setUltimates] = useState<UltimateData[]>([]);

  useEffect(() => {
    const fetchUltimates = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Ultimates");
      if (response.status === "ok") {
        setUltimates(response.data);
      }
    };
    fetchUltimates();
  }, []);

  return (
    <div>
      <h2>Ultimates</h2>
      <ul>
        {ultimates.map((ultimate, index) => (
          <li key={index}>
            <ImageComponent
              src={ultimate.configData.Icon}
              alt={ultimate.configData.DisplayName}
            />
            <span>{ultimate.configData.DisplayName}</span>
            <span>Max Tier: {ultimate.configData.MaxTier}</span>
            <span>Cooldown: {ultimate.configData.Cooldown}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UltimatesComponent;
