import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const ZoneFlagComponent: React.FC<{
  configData?: CollectionConfigData<"ZoneFlags">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"ZoneFlags">>
      collectionName="ZoneFlags"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Zone Flag</h2>
          <h3>{data.Name}</h3>
          <p>Description: {data.Desc}</p>
          <p>Duration: {data.Duration} seconds</p>
          <p>Color: {data.Color}</p>
          <p>
            Icon: <ImageComponent src={data.Icon} alt={data.Name} />
          </p>
          <h4>Rarity</h4>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          <p>Announce: {data.Rarity.Announce.toString()}</p>
        </div>
      )}
    />
  );
};

export default ZoneFlagComponent;
