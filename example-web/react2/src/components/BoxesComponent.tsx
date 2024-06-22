import React, { useEffect, useState } from "react";
import { BoxData, PetSimulator99API } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoxesComponent: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxData[]>([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Boxes");
      if (response.status === "ok") {
        setBoxes(response.data);
      }
    };
    fetchBoxes();
  }, []);

  return (
    <div>
      <h2>Boxes</h2>
      <ul>
        {boxes.map((box, index) => (
          <li key={index}>
            <ImageComponent
              src={box.configData.Icons[index].Icon}
              alt={box.configData.DisplayName}
            />
            <span>{box.configData.DisplayName}</span>
            <span>{box.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoxesComponent;
