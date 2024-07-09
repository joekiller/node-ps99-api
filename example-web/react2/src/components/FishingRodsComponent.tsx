import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const FishingRodsComponent: React.FC<{
  configData: CollectionConfigData<"FishingRods">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Fishing Chance: {configData.FishingChance}</p>
      <p>Fishing Currency Multiplier: {configData.FishingCurrencyMultiplier}</p>
      <p>Minimum Fishing Time: {configData.MinFishingTime} seconds</p>
      <p>
        Fishing Game Speed Multiplier: {configData.FishingGameSpeedMultiplier}
      </p>
      <p>Bar Size: {configData.BarSize}</p>
      <p>Associated Item ID: {configData.AssociatedItemID}</p>
      {configData.MerchantSalePrice && (
        <p>Merchant Sale Price: {configData.MerchantSalePrice}</p>
      )}
      <h3>Fishing Odds:</h3>
      <ul>
        {configData.FishingOdds.map((odds, index) => (
          <li key={index}>
            {odds[0]}: {odds[1]}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FishingRodsComponent;
