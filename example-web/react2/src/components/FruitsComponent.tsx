import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const FruitsComponent: React.FC<{
  configData?: CollectionConfigData<"Fruits">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Fruits">>
      collectionName="Fruits"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Duration: {data.Duration} seconds</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          {data.Desc && <p>Description: {data.Desc}</p>}
          {data.IgnoreFruitMachine && <p>Ignore Fruit Machine: Yes</p>}
          <h3>Boosts:</h3>
          <ul>
            {data.Boost.map((boost, index) => (
              <li key={index}>
                {boost.Type}: {boost.Amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

export default FruitsComponent;
