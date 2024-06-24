import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const BoothsComponent: React.FC<{
  configData?: CollectionConfigData<"Booths">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Booths">>
      collectionName="Booths"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Description: {data.Desc}</p>
          <p>Rarity: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          {data.Hidden && <p>Hidden: Yes</p>}
          {data.Tradable && <p>Tradable: Yes</p>}
          {data.OffSale && <p>Off Sale: Yes</p>}
          {data.ProductId && <p>Product ID: {data.ProductId}</p>}
          {data.DiamondPrice && <p>Diamond Price: {data.DiamondPrice}</p>}
          {data.Sittable && <p>Sittable: Yes</p>}
        </div>
      )}
    />
  );
};

export default BoothsComponent;
