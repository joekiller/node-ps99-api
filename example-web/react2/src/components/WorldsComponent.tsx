import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const WorldComponent: React.FC<{
  configData?: CollectionConfigData<"Worlds">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Worlds">>
      collectionName="Worlds"
      configData={configData}
      render={(data) => (
        <div>
          <h2>World</h2>
          <h3>{data.MapName}</h3>
          <p>Spawn ID: {data.SpawnId}</p>
          <p>World Currency: {data.WorldCurrency}</p>
          <p>Place ID: {data.PlaceId}</p>
          <p>World Number: {data.WorldNumber}</p>
          {data.AdditionalMusic && data.AdditionalMusic.length > 0 && (
            <div>
              <h4>Additional Music</h4>
              <ul>
                {data.AdditionalMusic.map((music, index) => (
                  <li key={index}>{music}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default WorldComponent;
