
import React from "react";
import { CollectionConfigData, RebirthUnlock } from "ps99-api";
import ItemCard from "./ItemCard";

const RebirthComponent: React.FC<{
  configData: CollectionConfigData<"Rebirths">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px', textAlign: 'left' }}>
        <p><strong>Zone Required:</strong> {configData.ZoneNumberRequired}</p>
        <p><strong>Strength Boost:</strong> {configData.StrengthPowerBoost}%</p>
        {configData.ResetZone && <p><strong>Reset Zone:</strong> {configData.ResetZone}</p>}
        {configData.BoostDesc && <p style={{ gridColumn: '1 / -1' }}><strong>Boost:</strong> {configData.BoostDesc}</p>}
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3 style={{ fontSize: '1.2em', marginBottom: '15px' }}>Unlocks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
          {configData.RebirthUnlocks.map(
            (unlock: RebirthUnlock, index: number) => (
              <div key={index}>
                <ItemCard
                  id={unlock.Title}
                  amount={1}
                  label={unlock.GuiTitle || unlock.Title}
                  itemData={{
                    icon: unlock.Icon,
                    rarity: undefined,
                    name: unlock.GuiTitle || unlock.Title
                  }}
                  rarityColor={null}
                />
                <div style={{ textAlign: 'center', fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
                  {unlock.Desc}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default RebirthComponent;
