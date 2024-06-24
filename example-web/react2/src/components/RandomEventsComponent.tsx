import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const RandomEventsComponent: React.FC<{
  configData?: CollectionConfigData<"RandomEvents">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"RandomEvents">>
      collectionName="RandomEvents"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Random Event: {data.Name}</h2>
          <div>
            <ImageComponent src={data.Icon} alt={data.Name} />
            <p>Color: {data.Color}</p>
            <p>Duration: {data.Duration} seconds</p>
            <p>Breaking Requirement: {data.BreakingRequirement}</p>
            <p>Playtime Requirement: {data.PlaytimeRequirement} minutes</p>
            <p>Chance: {data.Chance}</p>
            <p>Allow in Zones: {data.AllowInZones ? "Yes" : "No"}</p>
            <p>Allow in Instances: {data.AllowInInstances ? "Yes" : "No"}</p>
            <p>Allow Multiple: {data.AllowMultiple ? "Yes" : "No"}</p>
            {data.MinimumZone && <p>Minimum Zone: {data.MinimumZone}</p>}
          </div>
          <div>
            <h3>Area Whitelist:</h3>
            <ul>
              {Object.entries(data.AreaWhitelist).map(
                ([area, allowed], index) => (
                  <li key={index}>
                    {area.replace("_", " ")}: {allowed ? "Yes" : "No"}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      )}
    />
  );
};

export default RandomEventsComponent;
