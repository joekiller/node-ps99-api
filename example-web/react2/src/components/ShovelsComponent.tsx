import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

const ShovelComponent: React.FC<{
  configData: CollectionConfigData<"Shovels">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
        <ItemCard
          id={configData.DisplayName}
          amount={1}
          label={configData.DisplayName}
          itemData={{
            icon: configData.Icon,
            rarity: undefined,
            name: configData.DisplayName
          }}
          rarityColor={null}
        />
      </div>

      <div style={{ fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>{configData.Desc}</p>
        {configData.MerchantSalePrice && <p style={{ marginTop: '10px' }}><strong>Sale Price:</strong> {configData.MerchantSalePrice}</p>}
      </div>
    </div>
  );
};

export default ShovelComponent;
