import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoostsComponent: React.FC<{
  configData: CollectionConfigData<"Boosts">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Maximum Percent: {configData.MaximumPercent}%</p>
    </div>
  );
};

export default BoostsComponent;
