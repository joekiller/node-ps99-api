import React from "react";
import {
  CollectionConfigData,
  LootTableRoot,
  LootTableEntry,
  RawStackKey,
  LootTableData,
} from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

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
    <div key={index}>
      {table.entries.map((entry: LootTableEntry, entryIndex: number) => {
        const parsedStackKey = entry.Value._stackKey
          ? parseRawStackKey(entry.Value._stackKey)
          : null;
        return (
          <div key={entryIndex}>
            <h4>Loot Entry {entryIndex + 1}</h4>
            <p>Weight: {entry.Weight}</p>
            {parsedStackKey && (
              <>
                <p>Item ID: {parsedStackKey.id}</p>
                {parsedStackKey.tn && <p>Item TN: {parsedStackKey.tn}</p>}
                {parsedStackKey._am && <p>Amount: {parsedStackKey._am}</p>}
              </>
            )}
          </div>
        );
      })}
    </div>
  ));
};

const SeedComponent: React.FC<{
  configData?: CollectionConfigData<"Seeds">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Seeds">>
      collectionName="Seeds"
      configData={configData}
      render={(data) => (
        <div>
          <h2>Seed: {data.DisplayName}</h2>
          <p>Description: {data.Desc}</p>
          <p>Grow Time: {data.GrowTime} seconds</p>
          <p>
            Rarity: {data.Rarity.DisplayName} (Rarity Number:{" "}
            {data.Rarity.RarityNumber})
          </p>
          <ImageComponent src={data.Icon} alt={data.DisplayName} />
          <div>
            <h3>Loot Table</h3>
            {renderLootTable(data.LootTable)}
          </div>
        </div>
      )}
    />
  );
};

export default SeedComponent;
