import React from "react";
import {
  CollectionConfigData,
  LootTableRoot,
  LootTableEntry,
  RawStackKey,
  LootTableData,
} from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const parseRawStackKey = (rawStackKey: RawStackKey): LootTableData => {
  try {
    return JSON.parse(rawStackKey);
  } catch (error) {
    console.error("Failed to parse RawStackKey:", rawStackKey, error);
    return {} as LootTableData;
  }
};

const renderLootTable = (lootTable: LootTableRoot | LootTableRoot[]) => {
  const lootTableArray = Array.isArray(lootTable) ? lootTable : [lootTable];
  return lootTableArray.map((table, index) => (
    <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
      {table.entries.map((entry: LootTableEntry, entryIndex: number) => {
        const parsedStackKey = entry.Value._stackKey
          ? parseRawStackKey(entry.Value._stackKey)
          : null;
        return (
          <div key={entryIndex} style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px', background: '#f9f9f9', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Entry {entryIndex + 1}</span>
              <span className="badge">Weight: {entry.Weight}</span>
            </div>
            {parsedStackKey && (
              <div style={{ fontSize: '0.85em', color: '#555' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>ID: <strong>{parsedStackKey.id}</strong></span>
                </div>
                {parsedStackKey.tn && <div>Tier/TN: {parsedStackKey.tn}</div>}
                {parsedStackKey._am && <div>Amount: {parsedStackKey._am}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  ));
};

const SeedComponent: React.FC<{
  configData: CollectionConfigData<"Seeds">;
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
            icon: configData.Icon,
            rarity: configData.Rarity,
            name: configData.DisplayName
          }}
          rarityColor={rarityColor}
        />
      </div>

      <div style={{ marginBottom: '20px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>{configData.Desc}</p>
        <p style={{ fontWeight: 'bold', marginTop: '5px' }}>Grow Time: {configData.GrowTime}s</p>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '15px' }}>Loot Table</h3>
        {renderLootTable(configData.LootTable)}
      </div>
    </div>
  );
};

export default SeedComponent;
