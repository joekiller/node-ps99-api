import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const PetsComponent: React.FC<{
  configData?: CollectionConfigData<"Pets">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Pets">>
      collectionName="Pets"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.name}</h2>
          <ImageComponent src={data.thumbnail} alt={data.name} />
          {data.goldenThumbnail && (
            <ImageComponent
              src={data.goldenThumbnail}
              alt={`${data.name} (Golden)`}
            />
          )}
          <p>From World Number: {data.fromWorldNumber}</p>
          <p>From Zone Number: {data.fromZoneNumber}</p>
          {data.indexObtainable && <p>Index Obtainable: Yes</p>}
          {data.huge && <p>Huge: Yes</p>}
          {data.fly && <p>Can Fly: Yes</p>}
          {data.tradable && <p>Tradable: Yes</p>}
          {data.secret && <p>Secret: Yes</p>}
          {data.hidden && <p>Hidden: Yes</p>}
          {data.cachedPower && (
            <div>
              <h3>Cached Power:</h3>
              <ul>
                {data.cachedPower.map((power, index) => (
                  <li key={index}>{power}</li>
                ))}
              </ul>
            </div>
          )}
          {data.animations && (
            <div>
              <h3>Animations:</h3>
              <ul>
                {Object.entries(data.animations).map(([key, value], index) => (
                  <li key={index}>
                    {key}: {JSON.stringify(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.indexDesc && <p>Description: {data.indexDesc}</p>}
          {data.exclusiveLevel && <p>Exclusive Level: {data.exclusiveLevel}</p>}
          {data.power && <p>Power: {data.power}</p>}
        </div>
      )}
    />
  );
};

export default PetsComponent;
