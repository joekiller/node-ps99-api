import React from "react";
import { CollectionConfigData } from "ps99-api";
import DynamicCollectionConfigData from "./DynamicCollectionConfigData";

const BuffsComponent: React.FC<{
  configData: CollectionConfigData<"Buffs">;
}> = ({ configData }) => {
  return (
    <div
      style={{
        padding: "1em",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "2em",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>
        {configData.DisplayName}
      </h2>
      <p>
        <strong>Associated Item ID:</strong> {configData.AssociatedItemID}
      </p>
      <p>
        <strong>Associated Item Class:</strong> {configData.AssociatedItemClass}
      </p>
      <p>
        <strong>Length:</strong> {configData.Length} seconds
      </p>
      {configData.IgnoreInstancePause && (
        <p>
          <strong>Ignore Instance Pause:</strong> Yes
        </p>
      )}
      {configData.AssociatedItemClass === "Misc" && (
        <div style={{ marginTop: "2em" }}>
          <h3>Associated Misc Item</h3>
          <DynamicCollectionConfigData
            collectionName="MiscItems"
            configName={configData.AssociatedItemID}
          />
        </div>
      )}
    </div>
  );
};

export default BuffsComponent;
