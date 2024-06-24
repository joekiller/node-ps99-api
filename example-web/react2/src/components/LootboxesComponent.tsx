import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const LootboxesComponent: React.FC<{
  configData?: CollectionConfigData<"Lootboxes">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Lootboxes">>
      collectionName="Lootboxes"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Description: {data.Desc}</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
        </div>
      )}
    />
  );
};

export default LootboxesComponent;
