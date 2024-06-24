import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const ShovelComponent: React.FC<{
  configData?: CollectionConfigData<"Shovels">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Shovels">>
      collectionName="Shovels"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Shovel: {data.DisplayName}</h2>
          <p>Description: {data.Desc}</p>
          <p>Associated Item ID: {data.AssociatedItemID}</p>
          {data.MerchantSalePrice && (
            <p>Merchant Sale Price: {data.MerchantSalePrice}</p>
          )}
          <img src={data.Icon} alt={data.DisplayName} />
        </div>
      )}
    />
  );
};

export default ShovelComponent;
