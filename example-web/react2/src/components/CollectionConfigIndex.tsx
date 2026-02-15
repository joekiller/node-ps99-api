// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { PetSimulator99API, Collections, CollectionName } from "ps99-api";
import ItemCard from "./ItemCard";
import DynamicCollectionConfigData from "./DynamicCollectionConfigData";
import ImageComponent from "./ImageComponent";

import { useItemResolution } from "../hooks/useItemResolution";
import { useCollectionData } from "../context/CollectionDataContext";
import { Grid as FixedSizeGrid } from "react-window";
import { AutoSizer } from "react-virtualized-auto-sizer/dist/react-virtualized-auto-sizer.cjs";
import ItemCard from "./ItemCard";

const GridCellRenderer = ({ columnIndex, rowIndex, style, items, columnCount, navigate, collectionName, variantFilter, shinyFilter, resolveIcon, GAP }: any) => {
  const index = rowIndex * columnCount + columnIndex;
  if (index >= items.length) return null;
  const item = items[index];
  const itemConfig = (item as any).configData || item;
  const icon = resolveIcon(itemConfig);
  const itemDataWithIcon = { ...itemConfig, icon };

  return (
    <div style={style}>
      <div style={{
        position: 'absolute',
        top: GAP / 2,
        left: GAP / 2,
        right: GAP / 2,
        bottom: GAP / 2,
        // Using explicit specific size if needed, but absolute positioning with insets works well for gaps
      }}>
        <div
          onClick={() => navigate(`/collections/${collectionName}/${item.configName}`)}
          style={{ cursor: "pointer", height: '100%' }}
        >
          <ItemCard
            id={item.configName}
            amount={""}
            label={itemConfig.DisplayName || itemConfig.name || item.configName}
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



interface CollectionConfigIndexProps { }

const CollectionConfigIndex: React.FC<CollectionConfigIndexProps> = () => {
  const { collectionName } = useParams<{ collectionName: string }>();
  const navigate = useNavigate();
  // Call the hook at the top level so we can use it
  const { resolveIcon } = useItemResolution();

  const { data, fetchCollection, isLoading } = useCollectionData();

  const items = (data[collectionName || ""] || []) as Collections[];
  const loading = isLoading(collectionName || "");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State for Pets Filter
  const [specialFilter, setSpecialFilter] = useState<"H" | "T" | "G" | null>(null);
  const [variantFilter, setVariantFilter] = useState<"Normal" | "Golden" | "Rainbow">("Normal");
  const [shinyFilter, setShinyFilter] = useState<boolean>(false);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (collectionName) {
      fetchCollection(collectionName as CollectionName);
    }
  }, [collectionName, fetchCollection]);

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

  interface ItemData {
    items: typeof finalItems;
    columnCount?: number;
    navigate: any;
    collectionName: string | undefined;
    variantFilter: string;
    shinyFilter: boolean;
    resolveIcon: (item: any) => string | null;
    GAP: number;
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        height: "100%", // ensure it fills parent
      }}
    >
      {/* Header Bar inside Window */}
      <div
        style={{
          padding: "15px 20px",
          borderBottom: "4px solid #333",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontWeight: "900",
            color: "#333",
            textShadow: "3px 3px 0px #eee",
            marginRight: "auto",
            fontFamily: "'Fredoka One', cursive, sans-serif",
            letterSpacing: "1px",
          }}
        >
          {collectionName}!
        </h2>

        {/* Filter Ribbon (Pets Only) */}
        {collectionName === "Pets" && (
          <div style={{ display: "flex", gap: "8px", marginRight: "20px" }}>
            {/* Specials: H, T, G */}
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
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 0 #ccc",
                }}
              >
                {symbol}
              </button>
            ))}

            {/* Variants: Normal, Golden, Rainbow */}
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
                    width: "48px",
                    height: "48px",
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
                    boxShadow: "0 3px 0 #ccc",
                    filter: "none",
                    position: 'relative',
                    overflow: 'hidden',
                    padding: 0
                  }}
                  title={mode}
                >
                  {isGold ? (
                    <img
                      src="./assets/gold_variant_icon.png"
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

            {/* Shiny Toggle */}
            {/* Shiny Toggle */}
            <button
              onClick={() => setShinyFilter(!shinyFilter)}
              className={shinyFilter ? "sheen-effect" : ""}
              style={{
                width: "48px",
                height: "48px",
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
                boxShadow: "0 3px 0 #ccc",
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              ✨
            </button>
          </div>
        )}



        {/* Search Bar */}
        <div style={{ position: "relative" }}>
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
              backgroundColor: "#fff",
              color: "#ccc",
              textAlign: "right"
            }}
          />
        </div>

        {/* Red Close Button */}
        <button
          onClick={() => navigate("/collections")}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "#ff0055", // Hot pink/red
            color: "white",
            border: "4px solid #900", // Dark red border
            fontSize: "24px",
            fontWeight: "900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "inset 0 4px 4px rgba(255,255,255,0.4), 0 4px 0 #500",
          }}
        >
          X
        </button>
      </div>

      {/* Virtualized and AutoSized Content */}
      <div style={{ height: "calc(100vh - 80px)", width: "100%" }}>
        {/* @ts-ignore */}
        <AutoSizer style={{ width: "100%", height: "100%" }} renderProp={({ height, width }: { height: number; width: number }) => {
          if (!height || !width) return <div style={{ color: 'red' }}>AutoSizer returned 0 dimensions</div>;
          const GAP = 10;
          const MIN_COL_WIDTH = 150;

          const columnCount = Math.floor(width / MIN_COL_WIDTH) || 1;
          const columnWidth = width / columnCount;
          const rowHeight = 220; // Increased to ensure no cutoff
          const rowCount = Math.ceil(finalItems.length / columnCount);

          return (
            // @ts-ignore
            <FixedSizeGrid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              cellComponent={GridCellRenderer}
              cellProps={{
                items: finalItems,
                columnCount,
                navigate,
                collectionName,
                variantFilter,
                shinyFilter,
                resolveIcon,
                GAP
              }}
            />
          );
        }} />
      </div>

    </div >
  );
};

export default CollectionConfigIndex;
