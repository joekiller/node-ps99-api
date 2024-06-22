import React, { useEffect, useState } from "react";
import { PetSimulator99API, WateringCanData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const WateringCansComponent: React.FC = () => {
  const [wateringCans, setWateringCans] = useState<WateringCanData[]>([]);

  useEffect(() => {
    const fetchWateringCans = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("WateringCans");
      if (response.status === "ok") {
        setWateringCans(response.data);
      }
    };
    fetchWateringCans();
  }, []);

  return (
    <div>
      <h2>Watering Cans</h2>
      <ul>
        {wateringCans.map((can, index) => (
          <li key={index}>
            <ImageComponent
              src={can.configData.Icon}
              alt={can.configData.DisplayName}
            />
            <span>{can.configData.DisplayName}</span>
            <span>
              Plant Time Multiplier: {can.configData.PlantTimeMultiplier}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WateringCansComponent;
