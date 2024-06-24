import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

const MerchantComponent: React.FC<{
  configData?: CollectionConfigData<"Merchants">;
}> = ({ configData }) => {
  const renderStockRange = (stockRange: number[][] | undefined) => {
    if (!stockRange) return null;
    return stockRange.map((range, index) => (
      <div key={index}>
        <p>
          Level {index + 1}: {range[0]} - {range[1]}
        </p>
      </div>
    ));
  };

  return (
    <GenericFetchComponent<CollectionConfigData<"Merchants">>
      collectionName="Merchants"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.DisplayName}</h2>
          <p>Price Multiplier: {data.PriceMult}</p>
          <p>Machine Name: {data.MachineName}</p>
          <p>Refresh Rate: {data.RefreshRate} seconds</p>
          {data.HideNotification && <p>Notification: Hidden</p>}
          {data.HideRespect && <p>Respect: Hidden</p>}
          {data.IsStatic && <p>Static Merchant</p>}
          {renderStockRange(data.StockRangeByRespectLevel)}
          {data.SlotRespectLevels && (
            <div>
              <h3>Slot Respect Levels</h3>
              <p>{data.SlotRespectLevels.join(", ")}</p>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default MerchantComponent;
