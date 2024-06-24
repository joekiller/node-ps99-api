import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const EnchantsComponent: React.FC<{
  configData?: CollectionConfigData<"Enchants">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Enchants">>
      collectionName="Enchants"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Enchantment</h2>
          {data.PageIcon && (
            <ImageComponent src={data.PageIcon} alt="Page Icon" />
          )}
          <p>Base Tier: {data.BaseTier}</p>
          <p>Max Tier: {data.MaxTier}</p>
          <p>Max Page: {data.MaxPage}</p>
          {data.DiminishPowerThreshold && (
            <p>Diminish Power Threshold: {data.DiminishPowerThreshold}</p>
          )}
          {data.EmpoweredBoost && <p>Empowered Boost: {data.EmpoweredBoost}</p>}
          {data.ProductId && <p>Product ID: {data.ProductId}</p>}
          <h3>Tiers:</h3>
          <ul>
            {data.Tiers.map((tier, index) => (
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
      )}
    />
  );
};

export default EnchantsComponent;
