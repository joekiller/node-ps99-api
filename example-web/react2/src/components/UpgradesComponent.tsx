import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
import { useExpandableList } from "../hooks/useExpandableList";

const UpgradeComponent: React.FC<{
  configData: CollectionConfigData<"Upgrades">;
}> = ({ configData }) => {
  const { expandedIndices, toggle, expandAll, collapseAll, isExpanded } = useExpandableList(configData.TierCurrencies.length);

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      {configData.Icon && (
        <div style={{ maxWidth: '100px', margin: '0 auto 20px' }}>
          <ImageComponent src={configData.Icon} alt="Upgrade Icon" />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Tier Powers</h3>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
            {configData.TierPowers.map((power, index) => (
              <li key={index} style={{ padding: '5px 0', borderBottom: '1px dashed #eee' }}>
                <strong>Tier {index + 1}:</strong> {power}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Tier Costs</h3>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
            {configData.TierCosts.map((cost, index) => (
              <li key={index} style={{ padding: '5px 0', borderBottom: '1px dashed #eee' }}>
                <strong>Tier {index + 1}:</strong> {cost}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2em', marginBottom: '15px' }}>Tier Currencies</h3>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={expandAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Expand All</button>
          <button onClick={collapseAll} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Collapse All</button>
        </div>
        {configData.TierCurrencies.map((currency, index) => (
          <div key={index} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
            <div
              onClick={() => toggle(index)}
              style={{ cursor: 'pointer' }}
            >
              <h4 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isExpanded(index) ? '▼' : '▶'} {currency.DisplayName}
              </h4>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
                <span className="badge" style={{ borderColor: (currency.Rarity?.Color as string) || '#ccc' }}>{currency.Rarity?.DisplayName}</span>
                {currency.Tradable && <span className="badge">Tradable</span>}
                <span className="badge">Max: {currency.MaxAmount}</span>
              </div>
            </div>

            {isExpanded(index) && (
              <>
                <p style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#666' }}>{currency.Desc}</p>

                <h5 style={{ marginTop: '15px', borderBottom: '1px solid #e0e0e0' }}>Bag Tiers</h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginTop: '10px' }}>
                  {currency.BagTiers.map((bagTier, bagIndex) => (
                    <div key={bagIndex}>
                      <ItemCard
                        id={`bag-tier-${bagIndex}`}
                        amount={bagTier.value}
                        label={`Bag Tier ${bagIndex + 1}`}
                        itemData={{
                          icon: bagTier.image,
                          rarity: currency.Rarity,
                          name: `Bag Tier ${bagIndex + 1}`
                        }}
                        rarityColor={(currency.Rarity?.Color as string) || null}
                      />
                    </div>
                  ))}
                </div>

                <h5 style={{ marginTop: '15px', borderBottom: '1px solid #e0e0e0' }}>Tiers</h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginTop: '10px' }}>
                  {currency.Tiers.map((tier, tierIndex) => (
                    <div key={tierIndex}>
                      <ItemCard
                        id={tier.tierName}
                        amount={tier.value}
                        label={tier.tierName}
                        itemData={{
                          icon: tier.orbImage,
                          rarity: currency.Rarity,
                          name: tier.tierName
                        }}
                        rarityColor={(currency.Rarity?.Color as string) || null}
                      />
                      <div style={{ marginTop: '5px', fontSize: '0.8em', color: '#666', textAlign: 'center' }}>
                        Order: {tier.Order}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradeComponent;
