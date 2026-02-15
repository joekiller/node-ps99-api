import React, { useState } from "react";
import ImageComponent from "./ImageComponent";

interface ItemCardProps {
    id: string;
    amount: string | number;
    label: string;
    itemData?: any; // Pass full item data for customization
    rarityColor?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    // New props for visual variants
    variant?: "Normal" | "Golden" | "Rainbow";
    shiny?: boolean;
    // Legacy/Other props
    tn?: any;
    weight?: any;
    typeId?: any;
}

const ItemCard: React.FC<ItemCardProps> = ({
    id,
    amount,
    label,
    itemData,
    rarityColor = "#e0e0e0", // Default gray
    content,
    children,
    variant = "Normal",
    shiny = false,
    tn,      // Destructure but ignore
    weight,  // Destructure but ignore
    typeId   // Destructure but ignore
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // If custom content is provided, render that (for list view etc)
    if (content || children) {
        return <>{content || children}</>;
    }

    // Determine visual styles based on variant
    // Determine visual styles based on variant
    const filters: string[] = [];
    if (isHovered) {
        filters.push("drop-shadow(0 5px 10px rgba(0,0,0,0.2))");
    }

    let cardBorder = "2px solid #e0e0e0";
    let bgStyle = "#ffffff";

    if (variant === "Golden") {
        filters.push("sepia(100%) saturate(300%) hue-rotate(10deg)");
        cardBorder = "2px solid #FFD700";
        bgStyle = "#FFFDF0";
    } else if (variant === "Rainbow") {
        // Rainbow effect usually implies vibrant changing colors or just a rainbow gradient border
        // For item image, maybe a slight hue rotate or saturation boost?
        // Actual PS99 rainbow pets are distinct, but a filter approximation:
        filters.push("saturate(200%) hue-rotate(30deg) contrast(120%)");
        cardBorder = "2px solid #a29bfe"; // Placeholder for rainbow, usually gradient
    }

    const imageFilter = filters.length > 0 ? filters.join(" ") : "none";

    // Shiny Effect
    // Shiny acts as an overlay or texture

    // Clean White Square Style (Reference Match)
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                // border handled below
                borderRadius: "16px",
                backgroundColor: bgStyle,
                boxShadow: isHovered
                    ? "0 8px 20px rgba(0,0,0,0.1)"
                    : "0 2px 5px rgba(0,0,0,0.05)",
                transition: "all 0.1s ease-out",
                // transform: isHovered ? "translateY(-4px)" : "translateY(0)", // User requested no movement
                cursor: "pointer",
                width: "100%",
                aspectRatio: "1 / 1",
                position: "relative",
                overflow: "hidden",
                padding: "20px",
                boxSizing: "border-box", // CRITICAL: Ensure padding is included in width to prevent overlap
                // Rainbow Border Trick
                background: variant === "Rainbow"
                    ? "linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3) border-box"
                    : undefined,
                border: variant === "Rainbow" ? "3px solid transparent" : cardBorder,
                zIndex: isHovered ? 100 : 1, // Ensure it pops over neighbors on hover
            }}
        >
            {/* Shiny Sparkles Overlay */}
            {shiny && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 10,
                    backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z\" fill=\"%23FFD700\" opacity=\"0.4\"/%3E%3C/svg%3E')",
                    backgroundSize: "40px 40px",
                    opacity: 0.5,
                }} />
            )}

            {/* Rarity Indicator REMOVED based on user feedback */}

            {/* Item Image */}
            <div
                style={{
                    flex: 1,
                    width: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    marginTop: "10px",
                }}
            >
                {(() => {
                    // Use a simple local resolver if hook isn't available or just use the passed data
                    // actually we can't easily use the hook inside a map or conditional without refactoring parent
                    // BUT, we can just use the same logic here or expect the parent to pass a resolved/normalized object.
                    // However, to be "Universal" and "Clean", let's replicate the safe check here or expect `itemData` to be rich.

                    const iconSrc =
                        itemData?.icon ||
                        itemData?.Icon ||
                        itemData?.thumbnail ||
                        itemData?.image ||
                        itemData?.texture ||
                        itemData?.orbImage ||
                        itemData?.titanicIcon ||
                        itemData?.petIcon ||
                        itemData?.eggIcon ||
                        itemData?.enchantIcon ||
                        itemData?.potionIcon ||
                        itemData?.fruitIcon ||
                        itemData?.toyIcon ||
                        itemData?.charmIcon ||
                        itemData?.boothIcon ||
                        itemData?.flagIcon ||
                        itemData?.keyIcon ||
                        itemData?.seedIcon ||
                        itemData?.bookIcon ||
                        itemData?.giftIcon ||
                        itemData?.currencyIcon ||
                        itemData?.miscIcon;

                    if (iconSrc) {
                        return (
                            <ImageComponent
                                src={iconSrc}
                                alt={label}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    filter: imageFilter,
                                    transition: "filter 0.2s ease",
                                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                                }}
                            />
                        );
                    } else {
                        return <span style={{ fontSize: "3.5rem", opacity: 0.3 }}>?</span>;
                    }
                })()}
            </div>

            {/* Quantity Badge (Top Right) */}
            {amount && amount !== 1 && amount !== "1" && (
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "8px",
                        fontWeight: "800",
                        fontSize: "0.8rem",
                        zIndex: 5,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    x{amount.toLocaleString()}
                </div>
            )}

            {/* Label (Hover Only Overlay) */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "8px 4px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    textAlign: "center",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(100%)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 20,
                    borderTop: "2px solid rgba(0,0,0,0.05)",
                }}
            >
                <span
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: "800",
                        color: "#2d3436",
                        lineHeight: "1.1",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {label}
                </span>
            </div>
        </div>
    );
};

export default ItemCard;
