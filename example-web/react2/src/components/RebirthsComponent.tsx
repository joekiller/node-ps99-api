import React from "react";
import { CollectionConfigData, RebirthUnlock } from "ps99-api";
import ImageComponent from "./ImageComponent";

const RebirthComponent: React.FC<{
  configData: CollectionConfigData<"Rebirths">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Rebirth: {configData.DisplayName}</h2>
      <p>Rebirth Number: {configData.RebirthNumber}</p>
      <p>Zone Number Required: {configData.ZoneNumberRequired}</p>
      <p>Strength Power Boost: {configData.StrengthPowerBoost}%</p>
      <p>Boost Description: {configData.BoostDesc}</p>
      {configData.ResetZone && <p>Reset Zone: {configData.ResetZone}</p>}
      <h3>Unlocks:</h3>
      <ul>
        {configData.RebirthUnlocks.map(
          (unlock: RebirthUnlock, index: number) => (
            <li key={index}>
              <ImageComponent src={unlock.Icon} alt={unlock.Title} />
              <strong>{unlock.GuiTitle || unlock.Title}</strong>: {unlock.Desc}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default RebirthComponent;
