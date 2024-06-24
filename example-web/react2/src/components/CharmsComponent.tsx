import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const CharmsComponent: React.FC<{
  configData?: CollectionConfigData<"Charms">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Charms">>
      collectionName="Charms"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.Tiers[0].DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.Tiers[0].DisplayName} />
          <p>Base Tier: {data.BaseTier}</p>
          <p>Max Tier: {data.MaxTier}</p>
          {data.DiminishPowerThreshold && (
            <p>Diminish Power Threshold: {data.DiminishPowerThreshold}</p>
          )}
          {data.Unique && <p>Unique: Yes</p>}
          <h3>Tiers:</h3>
          <ul>
            {data.Tiers.map((tier, index) => (
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
      )}
    />
  );
};

export default CharmsComponent;
