import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const BoostsComponent: React.FC<{
  configData?: CollectionConfigData<"Boosts">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Boosts">>
      collectionName="Boosts"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Maximum Percent: {data.MaximumPercent}%</p>
        </div>
      )}
    />
  );
};

export default BoostsComponent;
