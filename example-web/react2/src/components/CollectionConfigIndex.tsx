// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { PetSimulator99API, Collections, CollectionName } from "ps99-api";
import ItemCard from "./ItemCard";
import DynamicCollectionConfigData from "./DynamicCollectionConfigData";
import ImageComponent from "./ImageComponent";

import { useItemResolution } from "../hooks/useItemResolution";
import { useCollectionData } from "../context/CollectionDataContext";
import { FixedSizeGrid, FixedSizeList } from "./ReactWindowMock";
import AutoSizer from "./AutoSizer";
import { useScrollPersistence } from "../context/ScrollContext";
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader';
import { formatGigantix } from "../utils/gigantix";

// const FixedSizeGrid = Grid;
// const FixedSizeList = List;

// Collections that need prefix stripping
const collectionsToClean = new Set([
  "Achievement", "Achievements",
  "Boost", "Boosts",
  "Booth", "Booths",
  "Box", "Boxes",
  "Charms",
  "Currency",
  "Enchants",
  "FishingRods",
  "Fruit", "Fruits",
  "Hoverboards",
  "Mastery", "Masteries",
  "Potions",
  "RandomEvents",
  "Rebirths",
  "SecretRooms",
  "Seeds",
  "Shovels",
  "Sprinklers",
  "Ultimates",
  "Upgrades",
  "WateringCans",
  "ZoneFlags",
  "XPPotions"
]);

// Collections that should default to Compact List View
const COMPACT_COLLECTIONS = new Set([
  "ZoneFlags",
  "Enchants",
  "Fruit",
  "Boosts",
  "Charms",
  "Hoverboards",
  "XPPotions",
  "Seeds",
  "Sprinklers",
  "WateringCans",
  "Shovels",
  "FishingRods",
  "Booths",
  "Boxes",
  "Rebirths",
  "RandomEvents",
  "SecretRooms",
  "Ultimates"
]);


function getCleanName(name: string, collectionName: string): string {
  if (!name || !collectionsToClean.has(collectionName)) return name;

  const prefixes = [collectionName];
  if (collectionName.endsWith('s')) prefixes.push(collectionName.slice(0, -1));
  if (collectionName === 'Boxes') prefixes.push('Box');

  for (const prefix of prefixes) {
    if (name.startsWith(prefix)) {
      const remainder = name.slice(prefix.length);
      if (remainder.length === 0) return ""; // Exact match returns empty to allow fallback
      if (remainder.startsWith(" | ")) return remainder.slice(3);
      if (remainder.startsWith(" - ")) return remainder.slice(3);
      if (remainder.startsWith(" ")) return remainder.slice(1);
    }
  }
  return name;
}

// --- Grid Cell Renderer ---
const GridCellRenderer = ({ columnIndex, rowIndex, style, data }: any) => {
  const { items, columnCount, navigate, collectionName, variantFilter, shinyFilter, resolveIcon, GAP } = data;
  const index = rowIndex * columnCount + columnIndex;
  if (index >= items.length) return null;
  const item = items[index];
  const itemConfig = (item as any).configData || item;
  const icon = resolveIcon(itemConfig);
  const itemDataWithIcon = { ...itemConfig, icon };

  const rawName = itemConfig.DisplayName || itemConfig.name || item.configName;
  let label = getCleanName(rawName, collectionName);
  if (!label && item.configName) {
    label = getCleanName(item.configName, collectionName);
  }
  if (!label) label = rawName;

  return (
    <div style={style}>
      <div style={{
        position: 'absolute',
        top: GAP / 2,
        left: GAP / 2,
        right: GAP / 2,
        bottom: GAP / 2,
      }}>
        <div
          onClick={() => navigate(`/collections/${collectionName}/${item.configName}`)}
          style={{ cursor: "pointer", height: '100%' }}
        >
          <ItemCard
            id={item.configName}
            amount={""}
            label={label}
            itemData={itemDataWithIcon}
            rarityColor={itemConfig.rarity?.Color || (itemConfig.Rarity?.Color)}
            variant={collectionName === "Pets" ? (variantFilter as any) : undefined}
            shiny={collectionName === "Pets" ? shinyFilter : undefined}
          />
        </div>
      </div>
    </div>
  );
};

// --- List Row Renderer ---
const ListRowRenderer = ({ index, style, data }: any) => {
  const { items, navigate, collectionName, resolveIcon, getRarityColor, variantFilter, shinyFilter } = data;
  const item = items[index];
  if (!item) return null;

  const itemConfig = (item as any).configData || item;
  if (collectionName === "Enchants" && index < 3) {
    console.log(`[Enchants Debug] Item ${index}:`, itemConfig);
    console.log(`[Enchants Debug] Diminish:`, itemConfig.DiminishPowerThreshold);
    console.log(`[Enchants Debug] Tiers:`, itemConfig.Tiers);
  }
  const icon = resolveIcon(itemConfig);
  const rarityColor = itemConfig.rarity?.Color || itemConfig.Rarity?.Color || getRarityColor(itemConfig.rarity || itemConfig.Rarity) || "#ccc";

  const rawName = itemConfig.DisplayName || itemConfig.name || item.configName;
  let name = getCleanName(rawName, collectionName);

  // If cleaning resulted in empty string (e.g. "Hoverboard" -> ""), try cleaning the configName ("Hoverboard | Original" -> "Original")
  if (!name && item.configName) {
    name = getCleanName(item.configName, collectionName);
  }
  // If still empty, revert to rawName
  if (!name) name = rawName;

  const rawSubtext = itemConfig.Description || itemConfig.Desc || (itemConfig.Tiers && itemConfig.Tiers[0]?.Desc) || item.configName;
  const cleanSubtext = (itemConfig.Description || itemConfig.Desc || (itemConfig.Tiers && itemConfig.Tiers[0]?.Desc)) ? (itemConfig.Description || itemConfig.Desc || (itemConfig.Tiers && itemConfig.Tiers[0]?.Desc)) : getCleanName(item.configName, collectionName);

  // Visual Styles for Pets
  let rowBorder = `2px solid #e0e0e0`;
  let rowBg = "#f9f9f9";
  let iconFilter = "none";
  let rainbowBackground = "";

  if (collectionName === "Pets") {
    if (variantFilter === "Golden") {
      iconFilter = "sepia(100%) saturate(300%) hue-rotate(10deg)";
      rowBorder = "2px solid #FFD700";
      rowBg = "#FFFDF0";
    } else if (variantFilter === "Rainbow") {
      iconFilter = "saturate(200%) hue-rotate(30deg) contrast(120%)";
      // Gradient border trick -> requires setting background to padding-box + border-box
      rainbowBackground = "linear-gradient(#f9f9f9, #f9f9f9) padding-box, linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3) border-box";
      rowBorder = "2px solid transparent";
    }
  }

  return (
    <div style={{ ...style, padding: "5px 10px", boxSizing: "border-box" }}>
      <div
        onClick={() => navigate(`/collections/${collectionName}/${item.configName}`)}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: rowBg,
          background: rainbowBackground || rowBg,
          borderRadius: "12px",
          padding: "8px 15px",
          height: "calc(100% - 10px)", // Account for padding
          cursor: "pointer",
          border: rowBorder,
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          borderLeft: (collectionName !== "Pets" || variantFilter === "Normal") ? `6px solid ${rarityColor}` : undefined,
          transition: "transform 0.1s active",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
        onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {/* Shiny Overlay */}
        {collectionName === "Pets" && shinyFilter && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: "none", zIndex: 10,
            backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z\" fill=\"%23FFD700\" opacity=\"0.4\"/%3E%3C/svg%3E')",
            backgroundSize: "40px 40px", opacity: 0.5,
          }} />
        )}

        {/* Icon (if available) */}
        {icon ? (
          <div style={{
            width: "48px",
            height: "48px",
            marginRight: "15px",
            flexShrink: 0,
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2
          }}>
            <ImageComponent
              src={icon}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "contain", filter: iconFilter }}
            />
          </div>
        ) : (
          <div style={{
            width: "48px", height: "48px", marginRight: "15px", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", backgroundColor: "#eee", borderRadius: "8px", color: "#aaa",
            zIndex: 2
          }}>
            ?
          </div>
        )}

        {/* Text Content */}
        <div style={{ flex: 1, overflow: "hidden", zIndex: 2 }}>
          <div style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#333",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "'Fredoka', 'Fredoka One', sans-serif",
          }}>
            {name}
          </div>
          {/* Optional Subtext - Only show if different from name */}
          {(cleanSubtext && cleanSubtext !== name) && (
            <div style={{
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "2px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.2em",
              maxHeight: "2.4em"
            }}>
              {cleanSubtext.replace("{amount}", itemConfig.Amount ? itemConfig.Amount.toLocaleString() : "...")}
            </div>
          )}

          {/* Generic Stats Rendering */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '2px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Duration / Time / ZoneFlags */}
            {(itemConfig.Duration || itemConfig.Time) && (
              <div style={{ fontSize: "0.85rem", color: "#1976d2", fontWeight: "600" }}>
                ⏱ {formatGigantix(itemConfig.Duration || itemConfig.Time)}s
              </div>
            )}

            {/* Power (Enchants/Potions) */}
            {(itemConfig.Power || (itemConfig.Tiers && itemConfig.Tiers[0]?.Power)) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: "0.85rem", color: "#E65100", fontWeight: "600" }}>
                  ⚡ {formatGigantix(itemConfig.Power || itemConfig.Tiers[0]?.Power)}
                </div>

                {/* Enchant Diminish Cap Calculator */}
                {collectionName === "Enchants" && itemConfig.DiminishPowerThreshold && itemConfig.Tiers && itemConfig.Tiers.length > 0 && (
                  (() => {
                    const maxTier = itemConfig.Tiers[itemConfig.Tiers.length - 1];
                    const power = maxTier.Power;
                    if (!power) return null;

                    const countToCap = Math.ceil(itemConfig.DiminishPowerThreshold / power);

                    return (
                      <div style={{
                        fontSize: "0.75rem",
                        backgroundColor: "#fff3e0",
                        color: "#e65100",
                        border: "1px solid #ffe0b2",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontWeight: "bold"
                      }} title={`Diminish Threshold: ${itemConfig.DiminishPowerThreshold} | Max Tier Power: ${power}`}>
                        <span>🛑 Cap: {countToCap}x</span>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* Speed (Hoverboards) */}
            {(collectionName === "Hoverboards" || itemConfig.Speed || itemConfig.DefaultJumpSpeedBoost) && (
              <div style={{ fontSize: "0.85rem", color: "#2E7D32", fontWeight: "600" }}>
                💨 {itemConfig.Speed ? formatGigantix(itemConfig.Speed) : (itemConfig.DefaultJumpSpeedBoost || 'Normal')}
              </div>
            )}

            {/* Boost (Boosts) */}
            {(collectionName === "Boosts" || itemConfig.Boost || itemConfig.MaximumPercent) && (
              <div style={{ fontSize: "0.85rem", color: "#9C27B0", fontWeight: "600" }}>
                🚀 {formatGigantix(itemConfig.Boost || itemConfig.MaximumPercent || 0)}%
              </div>
            )}

            {/* Multiplier */}
            {itemConfig.Multiplier && (
              <div style={{ fontSize: "0.85rem", color: "#C2185B", fontWeight: "600" }}>
                ✖ {itemConfig.Multiplier}x
              </div>
            )}
          </div>
        </div>

        {/* Chevron > */}
        <div style={{ marginLeft: "10px", color: "rgba(0,0,0,0.2)", fontWeight: "bold", fontSize: "1.2rem", zIndex: 2 }}>
          ›
        </div>
      </div>
    </div>
  );
};


interface CollectionConfigIndexProps { }

const CollectionConfigIndex: React.FC<CollectionConfigIndexProps> = () => {
  const { collectionName: rawCollectionName } = useParams<{ collectionName: string }>();
  // Normalize collection name to Title Case (e.g. "pets" -> "Pets") to match logic checks
  const collectionName = React.useMemo(() => {
    if (!rawCollectionName) return "";
    return rawCollectionName.charAt(0).toUpperCase() + rawCollectionName.slice(1);
  }, [rawCollectionName]);

  const navigate = useNavigate();
  // Call the hook at the top level so we can use it
  const { resolveIcon, getRarityColor } = useItemResolution();

  const { data, fetchCollection, isLoading } = useCollectionData();

  const items = (data[collectionName || ""] || []) as Collections[];
  const loading = isLoading(collectionName || "");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State for Pets Filter
  const [specialFilter, setSpecialFilter] = useState<"H" | "T" | "G" | null>(null);
  const [variantFilter, setVariantFilter] = useState<"Normal" | "Golden" | "Rainbow">("Normal");
  const [shinyFilter, setShinyFilter] = useState<boolean>(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false); // Mobile Toggle

  // View Mode: 'grid' or 'list'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Scroll Persistence
  const { saveScrollPosition, getScrollPosition } = useScrollPersistence();
  const scrollKey = `collection_config_${collectionName || 'default'}_${viewMode}`;
  const initialScrollOffset = getScrollPosition(scrollKey);

  // Save on unmount
  useEffect(() => {
    return () => {
      saveScrollPosition(scrollKey, scrollRef.current);
    };
  }, [saveScrollPosition, scrollKey]);

  useEffect(() => {
    if (collectionName) {
      fetchCollection(collectionName as CollectionName);
    }
  }, [collectionName, fetchCollection]);

  // Process items for rendering
  const processedItems = items.map((item) => {
    const configData: any = (item as any).configData || item;
    return {
      ...item,
      configData,
    };
  });

  const filteredItems = processedItems.filter((item) => {
    const config = item.configData;
    const name =
      config.DisplayName || config.name || item.configName || "";
    if (
      searchTerm &&
      !name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });


  // Apply Pet Filters
  const finalItems = filteredItems.filter((item) => {
    if (collectionName !== "Pets") return true;

    const config = item.configData;
    const name = config.DisplayName || config.name || item.configName || "";

    // Special Filter
    if (specialFilter === "H") {
      if (!name.startsWith("Huge ")) return false;
    } else if (specialFilter === "T") {
      if (!name.startsWith("Titanic ")) return false;
    } else if (specialFilter === "G") {
      if (!name.startsWith("Gargantuan ")) return false;
    } else {
      // None selected: Exclude Huge, Titanic, Gargantuan
      if (name.startsWith("Huge ") || name.startsWith("Titanic ") || name.startsWith("Gargantuan ")) return false;
    }

    return true;
  });

  // Determine View Mode
  useEffect(() => {
    if (isMobile) {
      setViewMode('list');
      return;
    }

    // Heuristic: If first 20 items have NO icons, default to list
    // Only check if we have items
    if (finalItems.length > 0) {
      const sample = finalItems.slice(0, 20);
      const hasImages = sample.some(item => !!resolveIcon(item.configData || item));
      const hasImages = sample.some(item => !!resolveIcon(item.configData || item));
      if (!hasImages || COMPACT_COLLECTIONS.has(collectionName)) {
        setViewMode('list');
      } else {
        setViewMode('grid');
      }
    }
  }, [isMobile, collectionName, finalItems.length]); // Re-evaluate on collection change or mobile resize, or items load


  // Scroll Direction  // Header Logic
  const { showHeader, handleScroll, scrollRef, headerRef, headerHeight, contentPadding } = useCollapsibleHeader({ deps: [loading] });

  // Loading State
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#666",
        }}
      >
        Loading {collectionName}...
      </div>
    );
  }

  const renderFilters = () => (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      flexWrap: isMobile ? "wrap" : "nowrap",
      justifyContent: isMobile ? "center" : "flex-start",
      padding: isMobile ? "10px 0" : "0",
      backgroundColor: isMobile ? "#f5f5f5" : "transparent",
      width: isMobile ? "100%" : "auto",
      borderRadius: isMobile ? "12px" : "0",
    }}>
      {/* Specials: H, T, G */}
      <div style={{ display: 'flex', gap: '5px' }}>
        {['H', 'T', 'G'].map((symbol) => (
          <button
            key={symbol}
            onClick={() => setSpecialFilter(specialFilter === symbol ? null : symbol as any)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "3px solid #333",
              backgroundColor: specialFilter === symbol ? "#333" : "#fff",
              color: specialFilter === symbol ? "#fff" : "#333",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 0 #ccc",
            }}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div style={{ width: "1px", height: "30px", backgroundColor: "#ddd", margin: "0 5px" }}></div>

      {/* Variants: Normal, Golden, Rainbow */}
      <div style={{ display: 'flex', gap: '5px' }}>
        {[
          { symbol: '🐾', mode: 'Normal', color: '#fff' },
          { symbol: '★', mode: 'Golden', color: '#FFD700' },
          { symbol: '🌈', mode: 'Rainbow', color: 'inherit' }
        ].map(({ symbol, mode, color: iconColor }) => {
          const isActive = variantFilter === mode;
          const isRainbow = mode === 'Rainbow';
          const isGold = mode === 'Golden';

          return (
            <button
              key={mode}
              onClick={() => setVariantFilter(mode as any)}
              className={(isActive && isRainbow) ? "sheen-effect" : ""}
              style={{
                width: "40px", // slightly smaller for mobile fit
                height: "40px",
                borderRadius: "50%",
                border: "3px solid #333",
                backgroundColor: isActive
                  ? (mode === 'Normal' ? "#e0e0e0" : "#333")
                  : "#fff",
                color: isActive
                  ? (mode === 'Normal' ? "#333" : "#fff")
                  : "#333",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 0 #ccc",
                filter: "none",
                position: 'relative',
                overflow: 'hidden',
                padding: 0
              }}
              title={mode}
            >
              {isGold ? (
                <img
                  src="/node-ps99-api/assets/gold_variant_icon.png"
                  alt="Gold"
                  style={{
                    width: '70%',
                    height: '70%',
                    objectFit: 'contain',
                    filter: isActive ? 'none' : 'grayscale(1) opacity(0.5)'
                  }}
                />
              ) : (
                <span style={{
                  filter: mode === 'Golden' && !isActive ? "grayscale(1)" : "none",
                  color: (isActive && mode !== 'Rainbow' && mode !== 'Normal') ? iconColor : 'inherit'
                }}>
                  {symbol}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Shiny Toggle */}
      <button
        onClick={() => setShinyFilter(!shinyFilter)}
        className={shinyFilter ? "sheen-effect" : ""}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "3px solid #333",
          backgroundColor: shinyFilter ? "#333" : "#fff",
          color: shinyFilter ? "#fff" : "#333",
          fontSize: "1.2rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 0 #ccc",
          position: 'relative',
          overflow: 'hidden',
          marginLeft: "5px"
        }}
      >
        ✨
      </button>
    </div>
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        height: "100%", // ensure it fills parent
        position: 'relative' // Context for absolute header
      }}
    >
      {/* Header Bar inside Window */}
      <div
        ref={headerRef}
        style={{
          padding: isMobile ? "10px 15px" : "15px 20px",
          borderBottom: "4px solid #333",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "10px" : "0px",
          backgroundColor: "#fff",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          transition: "transform 0.3s ease-in-out",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              fontWeight: "900",
              color: "#333",
              textShadow: isMobile ? "2px 2px 0px #eee" : "3px 3px 0px #eee",
              fontFamily: "'Fredoka One', cursive, sans-serif",
              letterSpacing: "1px",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              maxWidth: isMobile ? "60%" : "auto"
            }}
          >
            {collectionName}!
          </h2>

          {/* Mobile Filter Toggle (Pets Only) */}
          {collectionName === "Pets" && isMobile && (
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              style={{
                borderRadius: "12px",
                border: "2px solid #333", background: showFiltersMobile ? "#333" : "#fff",
                color: showFiltersMobile ? "#fff" : "#333",
                fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: "10px",
                padding: "8px 12px",
                fontWeight: "bold",
                boxShadow: "0 2px 0 #ccc",
              }}
            >
              {showFiltersMobile ? "Hide Filters" : "Filters"}
            </button>
          )}

          {/* Desktop Filter Ribbon (Pets Only) & Search */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', marginRight: '20px' }}>
              {collectionName === "Pets" && renderFilters()}
              <div style={{ position: "relative", marginLeft: collectionName === "Pets" ? "20px" : "0" }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "50px",
                    border: "3px solid #ccc",
                    outline: "none",
                    fontSize: "1.2rem",
                    width: "200px",
                    fontWeight: "800",
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                  }}
                />
              </div>
            </div>
          )}

          {/* Red Close Button */}
          <button
            onClick={() => navigate("/collections")}
            style={{
              width: isMobile ? "40px" : "48px",
              height: isMobile ? "40px" : "48px",
              borderRadius: "12px",
              backgroundColor: "#ff0055",
              color: "white",
              border: isMobile ? "3px solid #900" : "4px solid #900",
              fontSize: "20px",
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "inset 0 4px 4px rgba(255,255,255,0.4), 0 4px 0 #500",
              flexShrink: 0
            }}
          >
            X
          </button>
        </div>

        {/* Mobile Search Row */}
        {isMobile && (
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder={`Search ${collectionName}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 15px",
                borderRadius: "12px",
                border: "3px solid #ccc",
                outline: "none",
                fontSize: "1rem",
                width: "100%",
                fontWeight: "700",
                backgroundColor: "#f5f5f5",
                color: "#333",
                boxSizing: "border-box"
              }}
            />
          </div>
        )}


        {/* Mobile Filters Dropdown/Area */}
        {collectionName === "Pets" && isMobile && showFiltersMobile && (
          <div style={{ paddingTop: "10px", borderTop: "1px dashed #eee" }}>
            {renderFilters()}
          </div>
        )}

      </div>

      {/* Virtualized and AutoSized Content */}
      <div style={{ height: `calc(100% - ${contentPadding})`, width: "100%", flex: 1, marginTop: contentPadding, transition: "margin-top 0.3s ease-in-out, height 0.3s ease-in-out" }}>
        {/* @ts-ignore */}
        <AutoSizer style={{ width: "100%", height: "100%" }} renderProp={({ height, width }: { height: number; width: number }) => {
          const GAP = 10;
          // Adjustment for mobile header spacer
          // If mobile, we are absolute positioning the header. The list needs to have padding TOP to account for it, OR we just let the list flow and use `paddingTop` on the container.
          // However, AutoSizer gives us 'height' of the parent. We should subtract the header height IF it were static, but it's absolute.
          // So we should just use the full height, but ensure the first items aren't hidden behind the header.
          // A cleaner way for "Scroll to Hide" is to have the list occupy 100% height, and simply add a "Header Spacer" as the very first item in the list?
          // OR, simpler: Use `paddingTop` on the container div above, which we are animating.
          // Let's use `paddingTop` on the wrapper div. But wait, AutoSizer measures the `flex: 1` div.
          // If we animate `paddingTop`, the `height` passed to `AutoSizer` will change (because flex child shrinks).
          // That causes Re-renders of the list. That might be jerky.
          // BETTER APPROACH: Keep the list static full screen, and rely on `contentContainerStyle` padding?
          // React-window doesn't support dynamic contentContainerStyle easily without remounting.
          // Let's try the simpler approach first: `paddingTop` on the container. resizing might be performant enough.
          // actually, wait. If we use `paddingTop` on the flex container, the available height for AutoSizer shrinks.
          // This is GOOD. The list gets smaller, but stays at the bottom.
          // When header hides, padding becomes 0, list gets taller.
          // The issue is: scrolling DOWN triggers hide -> list grows -> potential scroll jump?
          // Let's test it.

          return (
            <>
              {viewMode === 'list' ? (
                /* @ts-ignore */
                <FixedSizeList
                  height={height}
                  itemCount={finalItems.length}
                  itemSize={80} // List view row height
                  width={width}
                  initialScrollOffset={initialScrollOffset}
                  onScroll={handleScroll}
                  itemData={{
                    items: finalItems,
                    navigate,
                    collectionName,
                    resolveIcon,
                    getRarityColor,
                    variantFilter,
                    shinyFilter
                  }}
                >
                  {/* @ts-ignore */}
                  {ListRowRenderer}
                </FixedSizeList>
              ) : (
                /* @ts-ignore */
                /* @ts-ignore */
                (() => {
                  const SCROLLBAR_WIDTH = 40;
                  const effectiveWidth = width - SCROLLBAR_WIDTH;
                  const colCount = Math.floor(effectiveWidth / 150) || 1;
                  const colWidth = effectiveWidth / colCount;

                  return (
                    <FixedSizeGrid
                      columnCount={colCount}
                      columnWidth={colWidth}
                      height={height}
                      rowCount={Math.ceil(finalItems.length / colCount)}
                      rowHeight={220}
                      width={width}
                      initialScrollOffset={initialScrollOffset}
                      onScroll={handleScroll}
                      style={{ overflowX: "hidden" }}
                      itemData={{
                        items: finalItems,
                        columnCount: colCount,
                        navigate,
                        collectionName,
                        variantFilter,
                        shinyFilter,
                        resolveIcon,
                        GAP
                      }}
                    >
                      {/* @ts-ignore */}
                      {GridCellRenderer}
                    </FixedSizeGrid>
                  );
                })()

              )}
            </>
          );
        }} />
      </div>

    </div >
  );
};

export default CollectionConfigIndex;
