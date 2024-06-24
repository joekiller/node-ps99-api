import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const ZoneComponent: React.FC<{
  configData?: CollectionConfigData<"Zones">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Zones">>
      collectionName="Zones"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Zone</h2>
          <h3>{data.ZoneName}</h3>
          <p>Zone Number: {data.ZoneNumber}</p>
          <p>World Number: {data.WorldNumber}</p>
          <p>Currency: {data.Currency}</p>
          <p>Maximum Available Egg: {data.MaximumAvailableEgg}</p>
          {data.Price && <p>Price: {data.Price}</p>}
          {data.GateHealth && <p>Gate Health: {data.GateHealth}</p>}
          {data.TeleportToZoneOnFall && (
            <p>
              Teleport to Zone on Fall: {data.TeleportToZoneOnFall.toString()}
            </p>
          )}
          {data.Ambience && <p>Ambience Sound ID: {data.Ambience.SoundId}</p>}
          {data.QuestsRequired && data.QuestsRequired.length > 0 && (
            <div>
              <h4>Quests Required</h4>
              <ul>
                {data.QuestsRequired.map((quest, index) => (
                  <li key={index}>
                    Type: {quest.Type}, Amount: {quest.Amount}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.Lighting && (
            <div>
              <h4>Lighting</h4>
              <p>Brightness: {data.Lighting.Brightness}</p>
              <p>Clock Time: {data.Lighting.ClockTime}</p>
              {data.Lighting.Bloom && (
                <div>
                  <h5>Bloom</h5>
                  <p>Enabled: {data.Lighting.Bloom.Enabled.toString()}</p>
                  <p>Intensity: {data.Lighting.Bloom.Intensity}</p>
                  <p>Size: {data.Lighting.Bloom.Size}</p>
                  <p>Threshold: {data.Lighting.Bloom.Threshold}</p>
                </div>
              )}
              {data.Lighting.ColorCorrection && (
                <div>
                  <h5>Color Correction</h5>
                  <p>
                    Enabled: {data.Lighting.ColorCorrection.Enabled.toString()}
                  </p>
                  <p>Saturation: {data.Lighting.ColorCorrection.Saturation}</p>
                  <p>Contrast: {data.Lighting.ColorCorrection.Contrast}</p>
                  <p>Brightness: {data.Lighting.ColorCorrection.Brightness}</p>
                </div>
              )}
              {data.Lighting.Sky && (
                <div>
                  <h5>Sky</h5>
                  <p>Star Count: {data.Lighting.Sky.StarCount}</p>
                  <p>
                    Celestial Bodies Shown:{" "}
                    {data.Lighting.Sky.CelestialBodiesShown.toString()}
                  </p>
                  <p>Skybox Up: {data.Lighting.Sky.SkyboxUp}</p>
                  <p>Skybox Bk: {data.Lighting.Sky.SkyboxBk}</p>
                  <p>Skybox Dn: {data.Lighting.Sky.SkyboxDn}</p>
                  <p>Skybox Lf: {data.Lighting.Sky.SkyboxLf}</p>
                  <p>Skybox Rt: {data.Lighting.Sky.SkyboxRt}</p>
                  <p>Skybox Ft: {data.Lighting.Sky.SkyboxFt}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ZoneComponent;
