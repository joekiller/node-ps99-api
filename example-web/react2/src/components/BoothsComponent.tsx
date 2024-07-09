import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoothsComponent: React.FC<{
  configData: CollectionConfigData<"Booths">;
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
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>
        <strong>Description:</strong> {configData.Desc}
      </p>
      <p>
        <strong>Rarity:</strong> {configData.Rarity.DisplayName}
      </p>
      <p>
        <strong>Rarity Number:</strong> {configData.Rarity.RarityNumber}
      </p>
      {configData.Hidden && (
        <p>
          <strong>Hidden:</strong> Yes
        </p>
      )}
      {configData.Tradable && (
        <p>
          <strong>Tradable:</strong> Yes
        </p>
      )}
      {configData.OffSale && (
        <p>
          <strong>Off Sale:</strong> Yes
        </p>
      )}
      {configData.ProductId && (
        <p>
          <strong>Product ID:</strong> {configData.ProductId}
        </p>
      )}
      {configData.DiamondPrice && (
        <p>
          <strong>Diamond Price:</strong> {configData.DiamondPrice}
        </p>
      )}
      {configData.Sittable && (
        <p>
          <strong>Sittable:</strong> Yes
        </p>
      )}
    </div>
  );
};

export default BoothsComponent;
