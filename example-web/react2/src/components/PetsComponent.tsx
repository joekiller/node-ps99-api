import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const PetsComponent: React.FC<{
  configData: CollectionConfigData<"Pets">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.name}</h2>
      <ImageComponent src={configData.thumbnail} alt={configData.name} />
      {configData.goldenThumbnail && (
        <ImageComponent
          src={configData.goldenThumbnail}
          alt={`${configData.name} (Golden)`}
        />
      )}
      <p>From World Number: {configData.fromWorldNumber}</p>
      <p>From Zone Number: {configData.fromZoneNumber}</p>
      {configData.indexObtainable && <p>Index Obtainable: Yes</p>}
      {configData.huge && <p>Huge: Yes</p>}
      {configData.fly && <p>Can Fly: Yes</p>}
      {configData.tradable && <p>Tradable: Yes</p>}
      {configData.secret && <p>Secret: Yes</p>}
      {configData.hidden && <p>Hidden: Yes</p>}
      {configData.cachedPower && (
        <div>
          <h3>Cached Power:</h3>
          <ul>
            {configData.cachedPower.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
        </div>
      )}
      {configData.animations && (
        <div>
          <h3>Animations:</h3>
          <ul>
            {Object.entries(configData.animations).map(
              ([key, value], index) => (
                <li key={index}>
                  {key}: {JSON.stringify(value)}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
      {configData.indexDesc && <p>Description: {configData.indexDesc}</p>}
      {configData.exclusiveLevel && (
        <p>Exclusive Level: {configData.exclusiveLevel}</p>
      )}
      {configData.power && <p>Power: {configData.power}</p>}
    </div>
  );
};

export default PetsComponent;
