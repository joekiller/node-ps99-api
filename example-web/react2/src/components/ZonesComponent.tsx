import React from "react";
import { CollectionConfigData } from "ps99-api";

const ZoneComponent: React.FC<{
  configData: CollectionConfigData<"Zones">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Zone</h2>
      <h3>{configData.ZoneName}</h3>
      <p>Zone Number: {configData.ZoneNumber}</p>
      <p>World Number: {configData.WorldNumber}</p>
      <p>Currency: {configData.Currency}</p>
      <p>Maximum Available Egg: {configData.MaximumAvailableEgg}</p>
      {configData.Price && <p>Price: {configData.Price}</p>}
      {configData.GateHealth && <p>Gate Health: {configData.GateHealth}</p>}
      {configData.TeleportToZoneOnFall && (
        <p>
          Teleport to Zone on Fall: {configData.TeleportToZoneOnFall.toString()}
        </p>
      )}
      {configData.Ambience && (
        <p>Ambience Sound ID: {configData.Ambience.SoundId}</p>
      )}
      {configData.QuestsRequired && configData.QuestsRequired.length > 0 && (
        <div>
          <h4>Quests Required</h4>
          <ul>
            {configData.QuestsRequired.map((quest, index) => (
              <li key={index}>
                Type: {quest.Type}, Amount: {quest.Amount}
              </li>
            ))}
          </ul>
        </div>
      )}
      {configData.Lighting && (
        <div>
          <h4>Lighting</h4>
          <p>Brightness: {configData.Lighting.Brightness}</p>
          <p>Clock Time: {configData.Lighting.ClockTime}</p>
          {configData.Lighting.Bloom && (
            <div>
              <h5>Bloom</h5>
              <p>Enabled: {configData.Lighting.Bloom.Enabled.toString()}</p>
              <p>Intensity: {configData.Lighting.Bloom.Intensity}</p>
              <p>Size: {configData.Lighting.Bloom.Size}</p>
              <p>Threshold: {configData.Lighting.Bloom.Threshold}</p>
            </div>
          )}
          {configData.Lighting.ColorCorrection && (
            <div>
              <h5>Color Correction</h5>
              <p>
                Enabled:{" "}
                {configData.Lighting.ColorCorrection.Enabled.toString()}
              </p>
              <p>
                Saturation: {configData.Lighting.ColorCorrection.Saturation}
              </p>
              <p>Contrast: {configData.Lighting.ColorCorrection.Contrast}</p>
              <p>
                Brightness: {configData.Lighting.ColorCorrection.Brightness}
              </p>
            </div>
          )}
          {configData.Lighting.Sky && (
            <div>
              <h5>Sky</h5>
              <p>Star Count: {configData.Lighting.Sky.StarCount}</p>
              <p>
                Celestial Bodies Shown:{" "}
                {configData.Lighting.Sky.CelestialBodiesShown.toString()}
              </p>
              <p>Skybox Up: {configData.Lighting.Sky.SkyboxUp}</p>
              <p>Skybox Bk: {configData.Lighting.Sky.SkyboxBk}</p>
              <p>Skybox Dn: {configData.Lighting.Sky.SkyboxDn}</p>
              <p>Skybox Lf: {configData.Lighting.Sky.SkyboxLf}</p>
              <p>Skybox Rt: {configData.Lighting.Sky.SkyboxRt}</p>
              <p>Skybox Ft: {configData.Lighting.Sky.SkyboxFt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoneComponent;
