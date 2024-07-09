import React from "react";
import { CollectionConfigData } from "ps99-api";

const MerchantsComponent: React.FC<{
  configData: CollectionConfigData<"Merchants">;
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
    <div>
      <h2>{configData.DisplayName}</h2>
      <p>Price Multiplier: {configData.PriceMult}</p>
      <p>Machine Name: {configData.MachineName}</p>
      <p>Refresh Rate: {configData.RefreshRate} seconds</p>
      {configData.HideNotification && <p>Notification: Hidden</p>}
      {configData.HideRespect && <p>Respect: Hidden</p>}
      {configData.IsStatic && <p>Static Merchant</p>}
      {renderStockRange(configData.StockRangeByRespectLevel)}
      {configData.SlotRespectLevels && (
        <div>
          <h3>Slot Respect Levels</h3>
          <p>{configData.SlotRespectLevels.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default MerchantsComponent;
