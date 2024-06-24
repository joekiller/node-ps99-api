import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const MiscItemsComponent: React.FC<{
  configData?: CollectionConfigData<"MiscItems">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"MiscItems">>
      collectionName="MiscItems"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <p>Category: {data.Category}</p>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          {data.AltIcon && (
            <ImageComponent
              src={data.AltIcon}
              alt={`${data.DisplayName} (Alternate)`}
            />
          )}
          <p>Description: {data.Desc}</p>
          <p>
            Rarity: {data.Rarity.DisplayName} (Rarity Number:{" "}
            {data.Rarity.RarityNumber})
          </p>
          {data.Tradable && <p>Tradable: Yes</p>}
          {!data.Tradable && <p>Tradable: No</p>}
        </div>
      )}
    />
  );
};

export default MiscItemsComponent;
