import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const MasteryComponent: React.FC<{
  configData: CollectionConfigData<"Mastery">;
}> = ({ configData }) => {
  const renderPerks = (perks: any) => {
    return Object.entries(perks).map(
      ([perkType, perkDetails]: [string, any]) => (
        <div key={perkType}>
          <h3>{perkType}</h3>
          {perkDetails.map((detail: any, index: number) => (
            <div key={index}>
              <p>Level: {detail.Level}</p>
              <p>Title: {detail.Title}</p>
              <p>Description: {detail.Text}</p>
              {detail.Power && <p>Power: {detail.Power}</p>}
            </div>
          ))}
        </div>
      ),
    );
  };

  return (
    <div>
      <h2>{configData.Name}</h2>
      <ImageComponent src={configData.Icon} alt={configData.Name} />
      <p>Description: {configData.Desc}</p>
      {configData.ToggleablePerks && (
        <div>
          <h3>Toggleable Perks</h3>
          {Object.entries(configData.ToggleablePerks).map(([perk, value]) => (
            <p key={perk}>
              {perk}: {value ? "Enabled" : "Disabled"}
            </p>
          ))}
        </div>
      )}
      <div>
        <h3>Perks</h3>
        {renderPerks(configData.Perks)}
      </div>
    </div>
  );
};

export default MasteryComponent;
