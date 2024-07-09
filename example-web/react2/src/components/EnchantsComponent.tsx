import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const EnchantsComponent: React.FC<{
  configData: CollectionConfigData<"Enchants">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Enchantment</h2>
      {configData.PageIcon && (
        <ImageComponent src={configData.PageIcon} alt="Page Icon" />
      )}
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
      <ul>
        {configData.Tiers.map((tier, index) => (
          <li key={index}>
            <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
            <p>Display Name: {tier.DisplayName}</p>
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

export default EnchantsComponent;
