import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const EnchantsComponent: React.FC<{
  configData: CollectionConfigData<"Enchants">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Enchantment</h2>
      <p>Base Tier: {configData.BaseTier}</p>
      <p>Max Tier: {configData.MaxTier}</p>
      <p>Max Page: {configData.MaxPage}</p>
      {configData.DiminishPowerThreshold && (
        <p>Diminish Power Threshold: {configData.DiminishPowerThreshold}</p>
      )}
      {configData.EmpoweredBoost && (
        <p>Empowered Boost: {configData.EmpoweredBoost}</p>
      )}
      {configData.ProductId && <p>Product ID: {configData.ProductId}</p>}
      <h3>Tiers:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        {configData.Tiers.map((tier, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1em",
              width: "calc(33% - 1em)",
              boxSizing: "border-box",
            }}
          >
            <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
            <h4>{tier.DisplayName}</h4>
            <p>
              <strong>Description:</strong> {tier.Desc}
            </p>
            <p>
              <strong>Power:</strong> {tier.Power}
            </p>
            <p>
              <strong>Rarity:</strong> {tier.Rarity.DisplayName}
            </p>
            <p>
              <strong>Rarity Number:</strong> {tier.Rarity.RarityNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnchantsComponent;
