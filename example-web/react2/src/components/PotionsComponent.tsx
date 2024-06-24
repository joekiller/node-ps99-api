import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const PotionsComponent: React.FC<{
  configData?: CollectionConfigData<"Potions">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Potions">>
      collectionName="Potions"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Potion: {data.Tiers[0].DisplayName}</h2>
          <div>
            <ImageComponent
              src={data.Tiers[0].Icon}
              alt={data.Tiers[0].DisplayName}
            />
            <p>Description: {data.Tiers[0].Desc}</p>
            <p>Primary Color: {data.PrimaryColor}</p>
            <p>Secondary Color: {data.SecondaryColor}</p>
            <p>Base Tier: {data.BaseTier}</p>
            <p>Max Tier: {data.MaxTier}</p>
          </div>
          <div>
            <h3>Tiers:</h3>
            <ul>
              {data.Tiers.map((tier, index) => (
                <li key={index}>
                  <p>Tier {index + 1}:</p>
                  <p>Display Name: {tier.DisplayName}</p>
                  <p>Description: {tier.Desc}</p>
                  <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
                  <p>Power: {tier.Power}</p>
                  <p>Time: {tier.Time}</p>
                  <p>Rarity: {tier.Rarity.DisplayName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    />
  );
};

export default PotionsComponent;
