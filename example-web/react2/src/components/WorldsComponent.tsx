import React from "react";
import { CollectionConfigData } from "ps99-api";

const WorldComponent: React.FC<{
  configData: CollectionConfigData<"Worlds">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>World</h2>
      <h3>{configData.MapName}</h3>
      <p>Spawn ID: {configData.SpawnId}</p>
      <p>World Currency: {configData.WorldCurrency}</p>
      <p>Place ID: {configData.PlaceId}</p>
      <p>World Number: {configData.WorldNumber}</p>
      {configData.AdditionalMusic && configData.AdditionalMusic.length > 0 && (
        <div>
          <h4>Additional Music</h4>
          <ul>
            {configData.AdditionalMusic.map((music, index) => (
              <li key={index}>{music}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorldComponent;
