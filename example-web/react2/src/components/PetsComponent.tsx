import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const PetsComponent: React.FC<{
  configData: CollectionConfigData<"Pets">;
  displayType?: "all" | "specific";
  pt?: number;
}> = ({ configData, displayType = "all", pt }) => {
  const getVariationName = () => {
    if (pt === 1) return "(Golden)";
    if (pt === 2) return "(Rainbow)";
    return "";
  };

  return (
    <div style={{ padding: "1em", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5em" }}>
        {configData.name} {getVariationName()}
      </h2>
      {displayType === "all" && (
        <>
          <ImageComponent src={configData.thumbnail} alt={configData.name} />
          {configData.goldenThumbnail && (
            <ImageComponent
              src={configData.goldenThumbnail}
              alt={`${configData.name} (Golden)`}
            />
          )}
        </>
      )}
      {displayType === "specific" && (
        <>
          {pt === 1 && configData.goldenThumbnail ? (
            <div style={{ minWidth: '250px' }}>
              <ImageComponent
                src={configData.goldenThumbnail}
                alt={`${configData.name} (Golden)`}
              />
            </div>
          ) : (
            <div style={{ minWidth: '250px', outline: pt === 2 ? '4px solid #FFD700' : 'none', borderRadius: '8px' }}>
              <ImageComponent
                src={configData.thumbnail}
                alt={configData.name}
              />
            </div>
          )}
        </>
      )}
      <p><strong>From World Number:</strong> {configData.fromWorldNumber}</p>
      <p><strong>From Zone Number:</strong> {configData.fromZoneNumber}</p>
      {configData.indexObtainable && <p><strong>Index Obtainable:</strong> Yes</p>}
      {configData.huge && <p><strong>Huge:</strong> Yes</p>}
      {configData.fly && <p><strong>Can Fly:</strong> Yes</p>}
      {configData.tradable && <p><strong>Tradable:</strong> Yes</p>}
      {configData.secret && <p><strong>Secret:</strong> Yes</p>}
      {configData.hidden && <p><strong>Hidden:</strong> Yes</p>}
      {configData.cachedPower && (
        <div>
          <h3>Cached Power:</h3>
          <ul>
            {configData.cachedPower.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
        </div>
      )}
      {configData.animations && (
        <div>
          <h3>Animations:</h3>
          <ul>
            {Object.entries(configData.animations).map(
              ([key, value], index) => (
                <li key={index}>
                  {key}: {JSON.stringify(value)}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
      {configData.indexDesc && <p><strong>Description:</strong> {configData.indexDesc}</p>}
      {configData.exclusiveLevel && (
        <p><strong>Exclusive Level:</strong> {configData.exclusiveLevel}</p>
      )}
      {configData.power && <p><strong>Power:</strong> {configData.power}</p>}
    </div>
  );
};

export default PetsComponent;
