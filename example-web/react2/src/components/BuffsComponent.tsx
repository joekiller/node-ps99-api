import React from "react";
import { CollectionConfigData } from "ps99-api";

const BuffsComponent: React.FC<{
  configData: CollectionConfigData<"Buffs">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <p>Associated Item ID: {configData.AssociatedItemID}</p>
      <p>Associated Item Class: {configData.AssociatedItemClass}</p>
      <p>Length: {configData.Length} seconds</p>
      {configData.IgnoreInstancePause && <p>Ignore Instance Pause: Yes</p>}
    </div>
  );
};

export default BuffsComponent;
