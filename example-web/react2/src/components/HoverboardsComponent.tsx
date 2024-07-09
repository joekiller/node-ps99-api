import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const HoverboardsComponent: React.FC<{
  configData: CollectionConfigData<"Hoverboards">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Description: {configData.Desc}</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      {configData.Tradable && <p>Tradable: Yes</p>}
      {configData.CanBeShiny && <p>Can Be Shiny: Yes</p>}
      {configData.HoverHeight && <p>Hover Height: {configData.HoverHeight}</p>}
      {configData.RotationLimit && (
        <p>Rotation Limit: {configData.RotationLimit}</p>
      )}
      {configData.ProductId && <p>Product ID: {configData.ProductId}</p>}
      {configData.Animation && <p>Animation: {configData.Animation}</p>}
      {configData.BobRate && <p>Bob Rate: {configData.BobRate}</p>}
      {configData.PitchScale && <p>Pitch Scale: {configData.PitchScale}</p>}
      {configData.MaxRoll && <p>Max Roll: {configData.MaxRoll}</p>}
      {configData.DefaultJumpSpeedBoost && (
        <p>Default Jump Speed Boost: {configData.DefaultJumpSpeedBoost}</p>
      )}
      {configData.IdleVolumeSpeedScale && (
        <p>Idle Volume Speed Scale: {configData.IdleVolumeSpeedScale}</p>
      )}
      {configData.IdlePitchScale && (
        <p>Idle Pitch Scale: {configData.IdlePitchScale}</p>
      )}
      {configData.BlockcastScale && (
        <p>Blockcast Scale: {configData.BlockcastScale}</p>
      )}
      {configData.SkateMode && <p>Skate Mode: Yes</p>}
      {configData.IdleVolume && <p>Idle Volume: {configData.IdleVolume}</p>}
    </div>
  );
};

export default HoverboardsComponent;
