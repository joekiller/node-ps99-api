import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ItemCard from "./ItemCard";

const BuffsComponent: React.FC<{
  configData: CollectionConfigData<"Buffs">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>

        {/* Left Column: Associated Item (Visuals) */}
        <div style={{
          background: '#f9f9f9',
          padding: '30px',
          borderRadius: '24px',
          border: '2px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {configData.AssociatedItemClass === "Misc" && (
            <>
              <h3 style={{ margin: 0, color: '#888', textTransform: 'uppercase', fontSize: '0.9rem' }}>Associated Item</h3>
              <div style={{ width: '100%', maxWidth: '300px' }}>
                <GenericFetchComponent
                  collectionName="MiscItems"
                  configName={configData.AssociatedItemID}
                  render={(data: any) => (
                    <ItemCard
                      id={data.DisplayName}
                      amount={1}
                      label={data.DisplayName}
                      itemData={{
                        icon: data.Icon,
                        rarity: data.Rarity,
                        name: data.DisplayName
                      }}
                    // Simple non-interactive card style
                    />
                  )}
                />
              </div>
            </>
          )}
          {/* If no associated item, maybe show a generic buff icon? */}
        </div>

        {/* Right Column: Stats & Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            width: '100%'
          }}>
            <div style={{ background: '#e0f7fa', padding: '15px', borderRadius: '12px', border: '1px solid #b2ebf2' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#006064', marginBottom: '5px' }}>CLASS</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00838f' }}>{configData.AssociatedItemClass}</span>
            </div>
            <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '12px', border: '1px solid #ffe0b2' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#e65100', marginBottom: '5px' }}>DURATION</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ef6c00' }}>{configData.Length}s</span>
            </div>
            {configData.IgnoreInstancePause && (
              <div style={{ background: '#fce4ec', padding: '15px', borderRadius: '12px', border: '1px solid #f8bbd0' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#880e4f', marginBottom: '5px' }}>SPECIAL</strong>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ad1457' }}>Ignores Pause</span>
              </div>
            )}
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '12px', border: '1px solid #ddd' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>ITEM ID</strong>
              <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#333' }}>{configData.AssociatedItemID}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BuffsComponent;
