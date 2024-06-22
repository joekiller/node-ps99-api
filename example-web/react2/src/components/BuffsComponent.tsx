import React, { useEffect, useState } from "react";
import { BuffData, PetSimulator99API } from "ps99-api";

const BuffsComponent: React.FC = () => {
  const [buffs, setBuffs] = useState<BuffData[]>([]);

  useEffect(() => {
    const fetchBuffs = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Buffs");
      if (response.status === "ok") {
        setBuffs(response.data);
      }
    };
    fetchBuffs();
  }, []);

  return (
    <div>
      <h2>Buffs</h2>
      <ul>
        {buffs.map((buff, index) => (
          <li key={index}>
            <span>{buff.configData.DisplayName}</span>
            <span>Length: {buff.configData.Length}</span>
            <span>
              Associated Item Class: {buff.configData.AssociatedItemClass}
            </span>
            <span>Associated Item ID: {buff.configData.AssociatedItemID}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuffsComponent;
