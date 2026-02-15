import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
import { useExpandableList } from "../hooks/useExpandableList";
import { formatGigantix } from "../utils/gigantix";

const UpgradeComponent: React.FC<{
  configData: CollectionConfigData<"Upgrades">;
}> = ({ configData }) => {
  // const { expandedIndices, toggle, expandAll, collapseAll, isExpanded } = useExpandableList(configData.TierCurrencies.length); // Not used anymore

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      {/* Header Info Section */}
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '16px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          {configData.Icon && (
            <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
              <ImageComponent src={configData.Icon} alt="Upgrade Icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <h2 style={{ margin: 0, fontSize: '1.5em', color: '#333' }}>Upgrade Details</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>Tier Powers</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {configData.TierPowers.map((power, index) => (
                <div key={index} style={{ background: '#e3f2fd', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9em', color: '#1565c0', border: '1px solid #bbdefb' }}>
                  T{index + 1}: <b>{formatGigantix(power)}</b>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>Tier Costs</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {configData.TierCosts.map((cost, index) => (
                <div key={index} style={{ background: '#ffebee', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9em', color: '#c62828', border: '1px solid #ffcdd2' }}>
                  T{index + 1}: <b>{formatGigantix(cost)}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.4em', marginBottom: '20px', color: '#333' }}>Tier Currencies</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {configData.TierCurrencies.map((currency, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '12px',
              border: `1px solid ${currency.Rarity?.Color || '#eee'}`,
              borderLeftWidth: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}>
              {/* Header: Name & Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '1.1em', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
                  {/* Optional: Add small icon if available from config or rarity */}
                  {currency.DisplayName}
                </h4>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <Badge color={currency.Rarity?.Color || '#999'}>{currency.Rarity?.DisplayName}</Badge>
                  {currency.Tradable && <Badge color="#2e7d32" bg="#e8f5e9">Tradable</Badge>}
                  <Badge color="#7b1fa2" bg="#f3e5f5">Max: {formatGigantix(currency.MaxAmount)}</Badge>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.9em', color: '#666', margin: '0 0 15px 0', lineHeight: '1.4' }}>{currency.Desc}</p>

              {/* Content Grid (Bag Tiers & Tiers) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {/* Bag Tiers */}
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '0.8em', textTransform: 'uppercase', color: '#999', letterSpacing: '0.5px' }}>Bag Tiers</h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: "8px" }}>
                    {currency.BagTiers.map((bagTier, bagIndex) => (
                      <div key={bagIndex} style={{ textAlign: 'center', background: '#f9f9f9', padding: '5px', borderRadius: '8px', border: '1px solid #eee' }}>
                        <div style={{ width: '40px', margin: '0 auto' }}>
                          <ImageComponent src={bagTier.image} alt="Icon" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div style={{ fontSize: '0.75em', marginTop: '4px', color: '#333', fontWeight: 'bold' }}>T{bagIndex + 1}</div>
                        <div style={{ fontSize: '0.7em', color: '#666' }}>{formatGigantix(bagTier.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Currency Tiers */}
                <div style={{ flex: 1.5, minWidth: '150px' }}>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '0.8em', textTransform: 'uppercase', color: '#999', letterSpacing: '0.5px' }}>Currency Tiers</h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: "8px" }}>
                    {currency.Tiers.map((tier, tierIndex) => (
                      <div key={tierIndex} style={{ textAlign: 'center', background: '#f9f9f9', padding: '5px', borderRadius: '8px', border: '1px solid #eee' }}>
                        <div style={{ width: '40px', margin: '0 auto' }}>
                          <ImageComponent src={tier.orbImage} alt="Icon" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div style={{ marginTop: '4px', fontSize: '0.75em', color: '#333', fontWeight: 'bold' }}>
                          T{tier.Order}
                        </div>
                        <div style={{ fontSize: '0.7em', color: '#666' }}>{formatGigantix(tier.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children, color, bg }: { children: React.ReactNode, color: string, bg?: string }) => (
  <span style={{
    background: bg || 'transparent',
    color: color,
    border: `1px solid ${color}`,
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '0.75em',
    fontWeight: 'bold',
    opacity: 0.9
  }}>
    {children}
  </span>
);

export default UpgradeComponent;
