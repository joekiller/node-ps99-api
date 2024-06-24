import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const SprinklerComponent: React.FC<{
  configData?: CollectionConfigData<"Sprinklers">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Sprinklers">>
      collectionName="Sprinklers"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Sprinkler: {data.Name}</h2>
          <p>Description: {data.Desc}</p>
          <p>Color: {data.Color}</p>
          <p>Duration: {data.Duration} seconds</p>
          <h3>Rarity</h3>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          <p>Display Name: {data.Rarity.DisplayName}</p>
          <ImageComponent src={data.Icon} alt={data.Name} />
        </div>
      )}
    />
  );
};

export default SprinklerComponent;
