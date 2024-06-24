import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const WateringCanComponent: React.FC<{
  configData?: CollectionConfigData<"WateringCans">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"WateringCans">>
      collectionName="WateringCans"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Watering Can</h2>
          <h3>{data.DisplayName}</h3>
          {data.Icon && (
            <ImageComponent src={data.Icon} alt={`${data.DisplayName} Icon`} />
          )}
          <p>Associated Item ID: {data.AssociatedItemID}</p>
          <p>Plant Time Multiplier: {data.PlantTimeMultiplier}</p>
          <p>
            Plant Time Multiplier Duration: {data.PlantTimeMultiplierDuration}
          </p>
        </div>
      )}
    />
  );
};

export default WateringCanComponent;
