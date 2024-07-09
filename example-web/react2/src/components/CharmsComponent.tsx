import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const CharmsComponent: React.FC<{
  configData: CollectionConfigData<"Charms">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.Tiers[0].DisplayName}</h2>
      <ImageComponent
        src={configData.Icon}
        alt={configData.Tiers[0].DisplayName}
      />
      <p>Base Tier: {configData.BaseTier}</p>
      <p>Max Tier: {configData.MaxTier}</p>
      {configData.DiminishPowerThreshold && (
        <p>Diminish Power Threshold: {configData.DiminishPowerThreshold}</p>
      )}
      {configData.Unique && <p>Unique: Yes</p>}
      <h3>Tiers:</h3>
      <ul>
        {configData.Tiers.map((tier, index) => (
          <li key={index}>
            <p>{tier.DisplayName}</p>
            <p>Description: {tier.Desc}</p>
            <p>Power: {tier.Power}</p>
            <p>Rarity: {tier.Rarity.DisplayName}</p>
            <p>Rarity Number: {tier.Rarity.RarityNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CharmsComponent;
