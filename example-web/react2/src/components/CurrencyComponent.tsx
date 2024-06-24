import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const CurrencyComponent: React.FC<{
  configData?: CollectionConfigData<"Currency">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Currency">>
      collectionName="Currency"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <p>Description: {data.Desc}</p>
          <p>Max Amount: {data.MaxAmount}</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          {data.Tradable && <p>Tradable: Yes</p>}
          {data.IsWorldCurrency && <p>World Currency: Yes</p>}
          {data.PermitAutoLootScaling && <p>Permit Auto Loot Scaling: Yes</p>}
          <h3>Tiers:</h3>
          <ul>
            {data.Tiers.map((tier, index) => (
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
          {data.BagTiers && (
            <div>
              <h3>Bag Tiers:</h3>
              <ul>
                {data.BagTiers.map((bagTier, index) => (
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
      )}
    />
  );
};

export default CurrencyComponent;
