import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoothsComponent: React.FC<{
  configData: CollectionConfigData<"Booths">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Description: {configData.Desc}</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      {configData.Hidden && <p>Hidden: Yes</p>}
      {configData.Tradable && <p>Tradable: Yes</p>}
      {configData.OffSale && <p>Off Sale: Yes</p>}
      {configData.ProductId && <p>Product ID: {configData.ProductId}</p>}
      {configData.DiamondPrice && (
        <p>Diamond Price: {configData.DiamondPrice}</p>
      )}
      {configData.Sittable && <p>Sittable: Yes</p>}
    </div>
  );
};

export default BoothsComponent;
