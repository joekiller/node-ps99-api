import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const XPPotionsComponent: React.FC<{ configData?: CollectionConfigData<"XPPotions"> }> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"XPPotions">>
      collectionName="XPPotions"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <p>Amount: {data.Amount}</p>
          <p>Description: {data.Desc}</p>
          <p>Item ID: {data.ItemId}</p>
          <h3>Rarity</h3>
          <p>Display Name: {data.Rarity.DisplayName}</p>
          <p>Rarity Number: {data.Rarity.RarityNumber}</p>
          <p>Announce: {data.Rarity.Announce ? "Yes" : "No"}</p>
        </div>
      )}
    />
  );
};

export default XPPotionsComponent;
