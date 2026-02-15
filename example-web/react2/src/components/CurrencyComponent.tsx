import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

import { formatGigantix } from "../utils/gigantix";

const CurrencyComponent: React.FC<{
  configData: CollectionConfigData<"Currency">;
}> = ({ configData }) => {
  return (

    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>{configData.Desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          <span className="badge">Max: {formatGigantix(configData.MaxAmount)}</span>
          {configData.Rarity && <span className="badge" style={{ borderColor: (configData.Rarity.Color as string) }}>Rarity: {configData.Rarity.DisplayName}</span>}
          {configData.Tradable && <span className="badge">Tradable</span>}
          {configData.IsWorldCurrency && <span className="badge">World Currency</span>}
          {configData.PermitAutoLootScaling && <span className="badge">Auto Loot</span>}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2em', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Tiers</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginTop: '15px' }}>
          {configData.Tiers.map((tier, index) => (
            <div key={index}>
              <ItemCard
                id={tier.tierName}
                amount={tier.value}
                label={tier.tierName}
                itemData={{
                  icon: tier.orbImage,
                  rarity: configData.Rarity,
                  name: tier.tierName
                }}
                rarityColor={(configData.Rarity?.Color as string) || null}
              />
              <div style={{ textAlign: 'center', fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                Order: {tier.Order}
              </div>
            </div>
          ))}
        </div>
      </div>

      {configData.BagTiers && (
        <div>
          <h3 style={{ fontSize: '1.2em', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Bag Tiers</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginTop: '15px' }}>
            {configData.BagTiers.map((bagTier, index) => (
              <div key={index}>
                <ItemCard
                  id={`bag-tier-${index}`}
                  amount={bagTier.value}
                  label={`Bag Tier ${index + 1}`}
                  itemData={{
                    icon: bagTier.image,
                    rarity: configData.Rarity,
                    name: `Bag Tier ${index + 1}`
                  }}
                  rarityColor={(configData.Rarity?.Color as string) || null}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default CurrencyComponent;
