import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const WateringCanComponent: React.FC<{
  configData: CollectionConfigData<"WateringCans">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Watering Can</h2>
      <h3>{configData.DisplayName}</h3>
      {configData.Icon && (
        <ImageComponent
          src={configData.Icon}
          alt={`${configData.DisplayName} Icon`}
        />
      )}
      <p>Associated Item ID: {configData.AssociatedItemID}</p>
      <p>Plant Time Multiplier: {configData.PlantTimeMultiplier}</p>
      <p>
        Plant Time Multiplier Duration: {configData.PlantTimeMultiplierDuration}
      </p>
    </div>
  );
};

export default WateringCanComponent;
