import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const BuffsComponent: React.FC<{
  configData?: CollectionConfigData<"Buffs">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Buffs">>
      collectionName="Buffs"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <p>Associated Item ID: {data.AssociatedItemID}</p>
          <p>Associated Item Class: {data.AssociatedItemClass}</p>
          <p>Length: {data.Length} seconds</p>
          {data.IgnoreInstancePause && <p>Ignore Instance Pause: Yes</p>}
        </div>
      )}
    />
  );
};

export default BuffsComponent;
