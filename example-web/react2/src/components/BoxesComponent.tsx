import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const BoxesComponent: React.FC<{
  configData: CollectionConfigData<"Boxes">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = configData.Rarity ? getRarityColor(configData.Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
        <ItemCard
          id={configData.DisplayName}
          amount={1}
          label={configData.DisplayName}
          itemData={{
            icon: configData.Icons && configData.Icons.length > 0 ? configData.Icons[0].Icon : undefined,
            rarity: configData.Rarity,
            name: configData.DisplayName
          }}
          rarityColor={rarityColor}
        />
      </div>

      <div style={{ marginBottom: '20px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>{configData.Desc}</p>
        <p style={{ fontWeight: 'bold' }}>Capacity: {configData.Capacity}</p>
      </div>

      {configData.Icons && configData.Icons.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.2em', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Variants</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px", marginTop: '15px' }}>
            {configData.Icons.map((icon, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <ItemCard
                  id={icon.Name}
                  amount={1}
                  label={icon.Name}
                  itemData={{
                    icon: icon.Icon,
                    rarity: configData.Rarity,
                    name: icon.Name
                  }}
                  rarityColor={rarityColor}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxesComponent;
