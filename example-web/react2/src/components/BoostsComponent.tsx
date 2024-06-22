import React, { useEffect, useState } from "react";
import { BoostData, PetSimulator99API } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoostsComponent: React.FC = () => {
  const [boosts, setBoosts] = useState<BoostData[]>([]);

  useEffect(() => {
    const fetchBoosts = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Boosts");
      if (response.status === "ok") {
        setBoosts(response.data);
      }
    };
    fetchBoosts();
  }, []);

  return (
    <div>
      <h2>Boosts</h2>
      <ul>
        {boosts.map((boost, index) => (
          <li key={index}>
            <ImageComponent
              src={boost.configData.Icon}
              alt={boost.configData.DisplayName}
            />
            <span>{boost.configData.DisplayName}</span>
            <span>{boost.configData.MaximumPercent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoostsComponent;
