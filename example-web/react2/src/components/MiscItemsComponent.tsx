import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const MiscItemsComponent: React.FC<{
  configData: CollectionConfigData<"MiscItems">;
}> = ({ configData }) => {
  return (
    <div
      style={{
        padding: "1em",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>
        {configData.DisplayName}
      </h2>
      <p>
        <strong>Category:</strong> {configData.Category}
      </p>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      {configData.AltIcon && (
        <ImageComponent
          src={configData.AltIcon}
          alt={`${configData.DisplayName} (Alternate)`}
        />
      )}
      <p>
        <strong>Description:</strong> {configData.Desc}
      </p>
      <p>
        <strong>Rarity:</strong> {configData.Rarity.DisplayName} (Rarity Number:{" "}
        {configData.Rarity.RarityNumber})
      </p>
      <p>
        <strong>Tradable:</strong> {configData.Tradable ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default MiscItemsComponent;
