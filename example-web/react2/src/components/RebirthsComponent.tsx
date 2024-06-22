import React, { useEffect, useState } from "react";
import { PetSimulator99API, RebirthData } from "ps99-api";

const RebirthsComponent: React.FC = () => {
  const [rebirths, setRebirths] = useState<RebirthData[]>([]);

  useEffect(() => {
    const fetchRebirths = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Rebirths");
      if (response.status === "ok") {
        setRebirths(response.data);
      }
    };
    fetchRebirths();
  }, []);

  return (
    <div>
      <h2>Rebirths</h2>
      <ul>
        {rebirths.map((rebirth, index) => (
          <li key={index}>
            <span>{rebirth.configData.DisplayName}</span>
            <span>Boost Description: {rebirth.configData.BoostDesc}</span>
            <span>Rebirth Number: {rebirth.configData.RebirthNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RebirthsComponent;
