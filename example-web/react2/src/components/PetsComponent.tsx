import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const PetsComponent: React.FC<{
  configData: CollectionConfigData<"Pets">;
  displayType?: "all" | "specific";
  pt?: number;
}> = ({ configData, displayType = "all", pt }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = (configData as any).rarity ? getRarityColor((configData as any).rarity) : null;

  const getVariationName = () => {
    if (pt === 1) return "(Golden)";
    if (pt === 2) return "(Rainbow)";
    return "";
  };

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      {/* 2-Column Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) 2fr', // Left (Image) : Right (Details)
        gap: '40px',
        height: '100%',
        alignItems: 'start'
      }}>

        {/* Left Column: Images */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Main Image */}
          <div style={{ width: '250px', height: '250px' }}>
            <ImageComponent src={configData.thumbnail} alt={configData.name} />
          </div>
          {/* Golden Variant if exists */}
          {configData.goldenThumbnail && (
            <div style={{ width: '150px', height: '150px', opacity: 0.8 }}>
              <p style={{ textAlign: 'center', margin: '0 0 5px 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#888' }}>Golden Variant</p>
              <ImageComponent
                src={configData.goldenThumbnail}
                alt={`${configData.name} (Golden)`}
              />
            </div>
          )}
        </div>

        {/* Right Column: details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            width: '100%'
          }}>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '12px', border: '1px solid #ddd' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>FROM WORLD</strong>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{configData.fromWorldNumber || "?"}</span>
            </div>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '12px', border: '1px solid #ddd' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>FROM ZONE</strong>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{configData.fromZoneNumber || "?"}</span>
            </div>
            {configData.power && (
              <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '12px', border: '1px solid #90caf9' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1565c0', marginBottom: '5px' }}>POWER</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1565c0' }}>{configData.power}</span>
              </div>
            )}
            {configData.exclusiveLevel && (
              <div style={{ background: '#f3e5f5', padding: '15px', borderRadius: '12px', border: '1px solid #ce93d8' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#7b1fa2', marginBottom: '5px' }}>EXCLUSIVE LEVEL</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7b1fa2' }}>{configData.exclusiveLevel}</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {configData.indexObtainable && <span className="badge" style={{ background: '#4caf50', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Index Obtainable</span>}
            {configData.huge && <span className="badge" style={{ background: '#ff9800', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>HUGE</span>}
            {configData.fly && <span className="badge" style={{ background: '#2196f3', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Fly</span>}
            {configData.tradable && <span className="badge" style={{ background: '#9c27b0', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Tradable</span>}
            {configData.secret && <span className="badge" style={{ background: '#607d8b', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Secret</span>}
            {configData.hidden && <span className="badge" style={{ background: '#333', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Hidden</span>}
          </div>

          {/* Description / Index Desc */}
          {configData.indexDesc && (
            <div style={{
              marginTop: '10px',
              padding: '20px',
              background: '#fff3e0',
              borderLeft: '5px solid #ff9800',
              borderRadius: '4px',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#5d4037'
            }}>
              "{configData.indexDesc}"
            </div>
          )}

          {/* Cached Power (Debug/Extra info) */}
          {configData.cachedPower && (
            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#999', fontSize: '0.8rem', textTransform: 'uppercase' }}>Technical Data</h4>
              <div style={{ fontSize: '0.86rem', color: '#aaa', fontFamily: 'monospace' }}>
                Cached Power: {configData.cachedPower.join(', ')}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


export default PetsComponent;
