import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const ShovelComponent: React.FC<{
  configData: CollectionConfigData<"Shovels">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Shovel: {configData.DisplayName}</h2>
      <p>Description: {configData.Desc}</p>
      <p>Associated Item ID: {configData.AssociatedItemID}</p>
      {configData.MerchantSalePrice && (
        <p>Merchant Sale Price: {configData.MerchantSalePrice}</p>
      )}
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
    </div>
  );
};

export default ShovelComponent;
