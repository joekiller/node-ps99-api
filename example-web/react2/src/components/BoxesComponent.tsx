import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const BoxesComponent: React.FC<{
  configData?: CollectionConfigData<"Boxes">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Boxes">>
      collectionName="Boxes"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <p>Description: {data.Desc}</p>
          <p>Capacity: {data.Capacity}</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          <h3>Icons:</h3>
          <ul>
            {data.Icons.map((icon, index) => (
              <li key={index}>
                <ImageComponent src={icon.Icon} alt={icon.Name} />
                <span>{icon.Name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

export default BoxesComponent;
