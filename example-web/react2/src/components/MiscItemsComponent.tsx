import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const MiscItemsComponent: React.FC<{
  configData: CollectionConfigData<"MiscItems">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <p>Category: {configData.Category}</p>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      {configData.AltIcon && (
        <ImageComponent
          src={configData.AltIcon}
          alt={`${configData.DisplayName} (Alternate)`}
        />
      )}
      <p>Description: {configData.Desc}</p>
      <p>
        Rarity: {configData.Rarity.DisplayName} (Rarity Number:{" "}
        {configData.Rarity.RarityNumber})
      </p>
      {configData.Tradable && <p>Tradable: Yes</p>}
      {!configData.Tradable && <p>Tradable: No</p>}
    </div>
  );
};

export default MiscItemsComponent;
