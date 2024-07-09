import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const XPPotionsComponent: React.FC<{
  configData: CollectionConfigData<"XPPotions">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Amount: {configData.Amount}</p>
      <p>Description: {configData.Desc}</p>
      <p>Item ID: {configData.ItemId}</p>
      <h3>Rarity</h3>
      <p>Display Name: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      <p>Announce: {configData.Rarity.Announce ? "Yes" : "No"}</p>
    </div>
  );
};

export default XPPotionsComponent;
