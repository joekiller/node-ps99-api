import React, { useEffect } from "react";
import { CollectionConfigData } from "ps99-api";
import { useCollectionData } from "../context/CollectionDataContext";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const ZoneComponent: React.FC<{
  configData: CollectionConfigData<"Zones">;
}> = ({ configData }) => {
  const { data, fetchCollection } = useCollectionData();
  const { getRarityColor, resolveItem } = useItemResolution();

  useEffect(() => {
    fetchCollection("Eggs");
  }, [fetchCollection]);

  const eggs = data["Eggs"] || [];
  const eggData = eggs.find(e => {
    const ec = (e as any).configData || e;
    const isNumberMatch = (ec.eggNumber !== undefined ? ec.eggNumber : ec._index) === configData.MaximumAvailableEgg;
    if (!isNumberMatch) return false;

    // Cross-reference categories for overlapping Event Numbers
    const zoneCat = (configData as any).category || "";
    const eggCat = (e as any).category || "";

    if (zoneCat === eggCat) return true;

    // Fallback Update vs Update logic for Events
    if (zoneCat.includes("Update") && eggCat.includes("Update")) {
      if ((configData as any).configName?.includes("Event") && ((e as any).configName?.includes("Event") || eggCat === "Event")) {
        return true;
      }
    }

    // If neither of these matched perfectly, assume it's just a regular match if we aren't looking at an event zone
    return !((configData as any).configName?.includes("Event")) && !(eggCat === "Event");
  });
  const eggConfig = eggData ? ((eggData as any).configData || eggData) : null;
  const eggRarityColor = eggConfig?.rarity ? getRarityColor(eggConfig.rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', textAlign: 'left' }}>
        <p><strong>Zone #:</strong> {configData.ZoneNumber}</p>
        <p><strong>World #:</strong> {configData.WorldNumber}</p>
        <p><strong>Currency:</strong> {configData.Currency}</p>
        <p><strong>Max Egg:</strong> {configData.MaximumAvailableEgg}</p>
        {configData.Price && <p><strong>Price:</strong> {configData.Price}</p>}
        {configData.GateHealth && <p><strong>Gate Health:</strong> {configData.GateHealth}</p>}
        {configData.TeleportToZoneOnFall && (
          <p><strong>Teleport on Fall:</strong> Yes</p>
        )}
        {configData.Ambience && (
          <p><strong>Ambience ID:</strong> {configData.Ambience.SoundId}</p>
        )}
      </div>

      {configData.QuestsRequired && configData.QuestsRequired.length > 0 && (
        <div style={{ width: '100%', marginTop: '20px' }}>
          <h4>Quests Required</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {configData.QuestsRequired.map((quest, index) => (
              <div key={index} style={{
                background: '#f0f0f0',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <strong>{quest.Type}</strong>: {quest.Amount}
              </div>
            ))}
          </div>
        </div>
      )}

      {configData.Lighting && (
        <div style={{ width: '100%', marginTop: '20px', textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ textAlign: 'center' }}>Lighting Settings</h4>
          <p>Brightness: {configData.Lighting.Brightness}</p>
          <p>Clock Time: {configData.Lighting.ClockTime}</p>

          {configData.Lighting.Bloom && (
            <div style={{ marginTop: '10px' }}>
              <strong>Bloom:</strong>
              <span style={{ fontSize: '0.9em', marginLeft: '10px' }}>
                Enabled: {configData.Lighting.Bloom.Enabled.toString()},
                Intensity: {configData.Lighting.Bloom.Intensity}
              </span>
            </div>
          )}

          {configData.Lighting.Sky && (
            <div style={{ marginTop: '10px' }}>
              <strong>Sky:</strong>
              <span style={{ fontSize: '0.9em', marginLeft: '10px' }}>
                Stars: {configData.Lighting.Sky.StarCount}
              </span>
            </div>
          )}
        </div>
      )}

      {eggConfig && (
        <div style={{ width: '100%', marginTop: '30px' }}>
          <h3 style={{ fontSize: '1.8em', marginBottom: '20px', color: '#333', borderLeft: '5px solid #2196f3', paddingLeft: '15px', textAlign: 'left' }}>
            Egg & Pets
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'start'
          }}>
            <div style={{ flex: "0 0 150px" }}>
              <ItemCard
                id={eggConfig.name}
                amount={1}
                label={eggConfig.name}
                itemData={{
                  icon: eggConfig.icon,
                  rarity: eggConfig.rarity,
                  name: eggConfig.name
                }}
                rarityColor={eggRarityColor}
                typeId={(eggConfig as any).eggNumber || (eggConfig as any)._index}
              />
            </div>
            {eggConfig.pets && eggConfig.pets.length > 0 && (
              <div style={{
                flex: "1 1 300px",
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '16px',
                background: '#fff',
                padding: '24px',
                borderRadius: '24px',
                border: '1px solid #eee',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
              }}>
                {eggConfig.pets.map((pet: any, index: number) => {
                  const petName = pet[0];
                  const chance = pet[1];
                  const tn = pet[2];
                  const resolvedItem = resolveItem(petName, tn);
                  const rarityColor = resolvedItem?.rarity ? getRarityColor(resolvedItem.rarity) : null;

                  return (
                    <div key={index}>
                      <ItemCard
                        id={petName}
                        amount={`${chance}%`}
                        label={resolvedItem?.name || petName}
                        itemData={resolvedItem}
                        rarityColor={rarityColor}
                        tn={tn}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoneComponent;
