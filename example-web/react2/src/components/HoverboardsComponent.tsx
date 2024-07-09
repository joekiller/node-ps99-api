import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const HoverboardsComponent: React.FC<{
  configData: CollectionConfigData<"Hoverboards">;
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
      {configData.Tradable && (
        <p>
          <strong>Tradable:</strong> Yes
        </p>
      )}
      {configData.CanBeShiny && (
        <p>
          <strong>Can Be Shiny:</strong> Yes
        </p>
      )}
      {configData.HoverHeight && (
        <p>
          <strong>Hover Height:</strong> {configData.HoverHeight}
        </p>
      )}
      {configData.RotationLimit && (
        <p>
          <strong>Rotation Limit:</strong> {configData.RotationLimit}
        </p>
      )}
      {configData.ProductId && (
        <p>
          <strong>Product ID:</strong> {configData.ProductId}
        </p>
      )}
      {configData.Animation && (
        <p>
          <strong>Animation:</strong> {configData.Animation}
        </p>
      )}
      {configData.BobRate && (
        <p>
          <strong>Bob Rate:</strong> {configData.BobRate}
        </p>
      )}
      {configData.PitchScale && (
        <p>
          <strong>Pitch Scale:</strong> {configData.PitchScale}
        </p>
      )}
      {configData.MaxRoll && (
        <p>
          <strong>Max Roll:</strong> {configData.MaxRoll}
        </p>
      )}
      {configData.DefaultJumpSpeedBoost && (
        <p>
          <strong>Default Jump Speed Boost:</strong>{" "}
          {configData.DefaultJumpSpeedBoost}
        </p>
      )}
      {configData.IdleVolumeSpeedScale && (
        <p>
          <strong>Idle Volume Speed Scale:</strong>{" "}
          {configData.IdleVolumeSpeedScale}
        </p>
      )}
      {configData.IdlePitchScale && (
        <p>
          <strong>Idle Pitch Scale:</strong> {configData.IdlePitchScale}
        </p>
      )}
      {configData.BlockcastScale && (
        <p>
          <strong>Blockcast Scale:</strong> {configData.BlockcastScale}
        </p>
      )}
      {configData.SkateMode && (
        <p>
          <strong>Skate Mode:</strong> Yes
        </p>
      )}
      {configData.IdleVolume && (
        <p>
          <strong>Idle Volume:</strong> {configData.IdleVolume}
        </p>
      )}
    </div>
  );
};

export default HoverboardsComponent;
