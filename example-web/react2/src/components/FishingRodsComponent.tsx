import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const FishingRodsComponent: React.FC<{
  configData?: CollectionConfigData<"FishingRods">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"FishingRods">>
      collectionName="FishingRods"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Fishing Chance: {data.FishingChance}</p>
          <p>Fishing Currency Multiplier: {data.FishingCurrencyMultiplier}</p>
          <p>Minimum Fishing Time: {data.MinFishingTime} seconds</p>
          <p>
            Fishing Game Speed Multiplier: {data.FishingGameSpeedMultiplier}
          </p>
          <p>Bar Size: {data.BarSize}</p>
          <p>Associated Item ID: {data.AssociatedItemID}</p>
          {data.MerchantSalePrice && (
            <p>Merchant Sale Price: {data.MerchantSalePrice}</p>
          )}
          <h3>Fishing Odds:</h3>
          <ul>
            {data.FishingOdds.map((odds, index) => (
              <li key={index}>
                {odds[0]}: {odds[1]}%
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

export default FishingRodsComponent;
