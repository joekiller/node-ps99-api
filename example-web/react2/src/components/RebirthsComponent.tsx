import React from "react";
import { CollectionConfigData, RebirthUnlock } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const RebirthComponent: React.FC<{
  configData?: CollectionConfigData<"Rebirths">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Rebirths">>
      collectionName="Rebirths"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Rebirth: {data.DisplayName}</h2>
          <p>Rebirth Number: {data.RebirthNumber}</p>
          <p>Zone Number Required: {data.ZoneNumberRequired}</p>
          <p>Strength Power Boost: {data.StrengthPowerBoost}%</p>
          <p>Boost Description: {data.BoostDesc}</p>
          {data.ResetZone && <p>Reset Zone: {data.ResetZone}</p>}
          <h3>Unlocks:</h3>
          <ul>
            {data.RebirthUnlocks.map((unlock: RebirthUnlock, index: number) => (
              <li key={index}>
                <ImageComponent src={unlock.Icon} alt={unlock.Title} />
                <strong>{unlock.GuiTitle || unlock.Title}</strong>:{" "}
                {unlock.Desc}
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

export default RebirthComponent;
