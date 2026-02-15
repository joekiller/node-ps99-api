import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const FishingRodsComponent: React.FC<{
  configData: CollectionConfigData<"FishingRods">;
}> = ({ configData }) => {
  return (
    <div className="game-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>{configData.DisplayName}</h2>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
        <p><strong>Chance:</strong> {configData.FishingChance}%</p>
        <p><strong>Currency:</strong> {configData.FishingCurrencyMultiplier}x</p>
        <p><strong>Speed:</strong> {configData.FishingGameSpeedMultiplier}x</p>
        <p><strong>Bar Size:</strong> {configData.BarSize}</p>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '10px' }}>Fishing Odds</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {configData.FishingOdds.map((odds, index) => (
            <span key={index} className="badge" style={{ background: '#e3f2fd', color: '#1565c0', border: '1px solid #90caf9' }}>
              {odds[0]}: {odds[1]}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FishingRodsComponent;
