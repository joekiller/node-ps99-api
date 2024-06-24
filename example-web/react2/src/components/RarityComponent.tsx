import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const RarityComponent: React.FC<{
  configData?: CollectionConfigData<"Rarity">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Rarity">>
      collectionName="Rarity"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Rarity: {data.DisplayName}</h2>
          <p>Rarity Number: {data.RarityNumber}</p>
          <p>Color: {data.Color}</p>
          <p>Announce: {data.Announce ? "Yes" : "No"}</p>
        </div>
      )}
    />
  );
};

export default RarityComponent;
