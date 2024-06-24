import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const HoverboardsComponent: React.FC<{
  configData?: CollectionConfigData<"Hoverboards">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Hoverboards">>
      collectionName="Hoverboards"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Description: {data.Desc}</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          {data.Tradable && <p>Tradable: Yes</p>}
          {data.CanBeShiny && <p>Can Be Shiny: Yes</p>}
          {data.HoverHeight && <p>Hover Height: {data.HoverHeight}</p>}
          {data.RotationLimit && <p>Rotation Limit: {data.RotationLimit}</p>}
          {data.ProductId && <p>Product ID: {data.ProductId}</p>}
          {data.Animation && <p>Animation: {data.Animation}</p>}
          {data.BobRate && <p>Bob Rate: {data.BobRate}</p>}
          {data.PitchScale && <p>Pitch Scale: {data.PitchScale}</p>}
          {data.MaxRoll && <p>Max Roll: {data.MaxRoll}</p>}
          {data.DefaultJumpSpeedBoost && (
            <p>Default Jump Speed Boost: {data.DefaultJumpSpeedBoost}</p>
          )}
          {data.IdleVolumeSpeedScale && (
            <p>Idle Volume Speed Scale: {data.IdleVolumeSpeedScale}</p>
          )}
          {data.IdlePitchScale && (
            <p>Idle Pitch Scale: {data.IdlePitchScale}</p>
          )}
          {data.BlockcastScale && <p>Blockcast Scale: {data.BlockcastScale}</p>}
          {data.SkateMode && <p>Skate Mode: Yes</p>}
          {data.IdleVolume && <p>Idle Volume: {data.IdleVolume}</p>}
        </div>
      )}
    />
  );
};

export default HoverboardsComponent;
