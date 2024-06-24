import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const UltimateComponent: React.FC<{
  configData?: CollectionConfigData<"Ultimates">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Ultimates">>
      collectionName="Ultimates"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Ultimate: {data.DisplayName}</h2>
          <p>Description: {data.Desc}</p>
          <p>Max Tier: {data.MaxTier}</p>
          <p>FFlag Name: {data.FFlagName}</p>
          {data.Tradable && <p>Tradable</p>}
          {data.ProductId && <p>Product ID: {data.ProductId}</p>}
          {data.NotAllowedInInstances && <p>Not Allowed in Instances</p>}
          <h3>Rarity</h3>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          <p>Display Name: {data.Rarity.DisplayName}</p>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <h3>Tiers</h3>
          <p>Tier to Level Mapping: {data.TierToLevel.join(", ")}</p>
          <p>Level to Tier Mapping: {data.LevelToTier.join(", ")}</p>
        </div>
      )}
    />
  );
};

export default UltimateComponent;
