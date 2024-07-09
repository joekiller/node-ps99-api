import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const PotionsComponent: React.FC<{
  configData: CollectionConfigData<"Potions">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Potion: {configData.Tiers[0].DisplayName}</h2>
      <div>
        <ImageComponent
          src={configData.Tiers[0].Icon}
          alt={configData.Tiers[0].DisplayName}
        />
        <p>Description: {configData.Tiers[0].Desc}</p>
        <p>Primary Color: {configData.PrimaryColor}</p>
        <p>Secondary Color: {configData.SecondaryColor}</p>
        <p>Base Tier: {configData.BaseTier}</p>
        <p>Max Tier: {configData.MaxTier}</p>
      </div>
      <div>
        <h3>Tiers:</h3>
        <ul>
          {configData.Tiers.map((tier, index) => (
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
  );
};

export default PotionsComponent;
