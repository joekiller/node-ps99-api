import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const RandomEventsComponent: React.FC<{
  configData: CollectionConfigData<"RandomEvents">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Random Event: {configData.Name}</h2>
      <div>
        <ImageComponent src={configData.Icon} alt={configData.Name} />
        <p>Color: {configData.Color}</p>
        <p>Duration: {configData.Duration} seconds</p>
        <p>Breaking Requirement: {configData.BreakingRequirement}</p>
        <p>Playtime Requirement: {configData.PlaytimeRequirement} minutes</p>
        <p>Chance: {configData.Chance}</p>
        <p>Allow in Zones: {configData.AllowInZones ? "Yes" : "No"}</p>
        <p>Allow in Instances: {configData.AllowInInstances ? "Yes" : "No"}</p>
        <p>Allow Multiple: {configData.AllowMultiple ? "Yes" : "No"}</p>
        {configData.MinimumZone && (
          <p>Minimum Zone: {configData.MinimumZone}</p>
        )}
      </div>
      <div>
        <h3>Area Whitelist:</h3>
        <ul>
          {Object.entries(configData.AreaWhitelist).map(
            ([area, allowed], index) => (
              <li key={index}>
                {area.replace("_", " ")}: {allowed ? "Yes" : "No"}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default RandomEventsComponent;
