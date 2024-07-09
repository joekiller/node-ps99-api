import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const ZoneFlagComponent: React.FC<{
  configData: CollectionConfigData<"ZoneFlags">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Zone Flag</h2>
      <h3>{configData.Name}</h3>
      <p>Description: {configData.Desc}</p>
      <p>Duration: {configData.Duration} seconds</p>
      <p>Color: {configData.Color}</p>
      <p>
        Icon: <ImageComponent src={configData.Icon} alt={configData.Name} />
      </p>
      <h4>Rarity</h4>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      <p>Announce: {configData.Rarity.Announce.toString()}</p>
    </div>
  );
};

export default ZoneFlagComponent;
