import React from "react";
import { CollectionConfigData } from "ps99-api";

const RarityComponent: React.FC<{
  configData: CollectionConfigData<"Rarity">;
}> = ({ configData }) => {
  // Use the rarity color for styling
  const rarityColor = configData.Color || "#333";
  const glowColor = rarityColor;

  return (
    <div style={{
      padding: "40px",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      {/* Rarity Showcase Card */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: `0 10px 40px ${glowColor}40`,
        border: `3px solid ${rarityColor}`,
        maxWidth: "600px",
        width: "100%",
        textAlign: "center",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        cursor: "default"
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Background Glow */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "150%",
          height: "300px",
          background: `radial-gradient(circle, ${rarityColor}33 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            color: rarityColor,
            margin: "0 0 10px 0",
            textShadow: `0 2px 10px ${glowColor}60`
          }}>
            {configData.DisplayName}
          </h1>
          <div style={{
            fontSize: "1.2rem",
            color: "#888",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px"
          }}>
            Rarity #{configData.RarityNumber}
          </div>
        </div>
      </div>

      {/* Exhaustive Data Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        maxWidth: "800px",
        width: "100%"
      }}>
        {Object.entries(configData).map(([key, value]) => {
          // Skip rendering complex objects if intended for simple display, or stringify them
          if (typeof value === 'object' && value !== null) {
            return (
              <DataCard key={key} label={key} value={JSON.stringify(value)} color={rarityColor} />
            );
          }
          return (
            <DataCard key={key} label={key} value={String(value)} color={rarityColor} />
          );
        })}
      </div>

    </div>
  );
};

const DataCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    borderLeft: `4px solid ${color}`,
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-word"
  }}>
    <span style={{
      fontSize: "12px",
      color: "#aaa",
      fontWeight: "700",
      textTransform: "uppercase",
      marginBottom: "8px"
    }}>
      {label}
    </span>
    <span style={{
      fontSize: "16px",
      color: "#333",
      fontWeight: "600"
    }}>
      {value}
    </span>
  </div>
);

export default RarityComponent;
