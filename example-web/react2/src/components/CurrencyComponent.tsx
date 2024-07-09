import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const CurrencyComponent: React.FC<{
  configData: CollectionConfigData<"Currency">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <p>Description: {configData.Desc}</p>
      <p>Max Amount: {configData.MaxAmount}</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      {configData.Tradable && <p>Tradable: Yes</p>}
      {configData.IsWorldCurrency && <p>World Currency: Yes</p>}
      {configData.PermitAutoLootScaling && <p>Permit Auto Loot Scaling: Yes</p>}
      <h3>Tiers:</h3>
      <ul>
        {configData.Tiers.map((tier, index) => (
          <li key={index}>
            <ImageComponent src={tier.orbImage} alt={tier.tierName} />
            <p>Tier Name: {tier.tierName}</p>
            <p>Order: {tier.Order}</p>
            <p>Value: {tier.value}</p>
            <ImageComponent
              src={tier.imageOutline}
              alt={`${tier.tierName} outline`}
            />
            {tier.isBottom && <p>Is Bottom: Yes</p>}
            <ImageComponent
              src={tier.tinyImage}
              alt={`${tier.tierName} tiny`}
            />
          </li>
        ))}
      </ul>
      {configData.BagTiers && (
        <div>
          <h3>Bag Tiers:</h3>
          <ul>
            {configData.BagTiers.map((bagTier, index) => (
              <li key={index}>
                <ImageComponent
                  src={bagTier.image}
                  alt={`Bag tier ${index + 1}`}
                />
                <p>Value: {bagTier.value}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyComponent;
