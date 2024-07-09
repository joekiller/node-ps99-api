import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const UltimateComponent: React.FC<{
  configData: CollectionConfigData<"Ultimates">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Ultimate: {configData.DisplayName}</h2>
      <p>Description: {configData.Desc}</p>
      <p>Max Tier: {configData.MaxTier}</p>
      <p>FFlag Name: {configData.FFlagName}</p>
      {configData.Tradable && <p>Tradable</p>}
      {configData.ProductId && <p>Product ID: {configData.ProductId}</p>}
      {configData.NotAllowedInInstances && <p>Not Allowed in Instances</p>}
      <h3>Rarity</h3>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      <p>Display Name: {configData.Rarity.DisplayName}</p>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <h3>Tiers</h3>
      <p>Tier to Level Mapping: {configData.TierToLevel.join(", ")}</p>
      <p>Level to Tier Mapping: {configData.LevelToTier.join(", ")}</p>
    </div>
  );
};

export default UltimateComponent;
