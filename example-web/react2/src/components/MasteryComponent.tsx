import React from "react";
import { CollectionConfigData, MasteryConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const MasteryComponent: React.FC<{
  configData?: CollectionConfigData<"Mastery">;
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
    <GenericFetchComponent<CollectionConfigData<"Mastery">>
      collectionName="Mastery"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.Name}</h2>
          <ImageComponent src={data.Icon} alt={data.Name} />
          <p>Description: {data.Desc}</p>
          {data.ToggleablePerks && (
            <div>
              <h3>Toggleable Perks</h3>
              {Object.entries(data.ToggleablePerks).map(([perk, value]) => (
                <p key={perk}>
                  {perk}: {value ? "Enabled" : "Disabled"}
                </p>
              ))}
            </div>
          )}
          <div>
            <h3>Perks</h3>
            {renderPerks(data.Perks)}
          </div>
        </div>
      )}
    />
  );
};

export default MasteryComponent;
