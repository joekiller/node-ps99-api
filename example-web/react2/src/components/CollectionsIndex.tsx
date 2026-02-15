import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PetSimulator99API, CollectionName } from "ps99-api";
import { COLLECTION_ICONS } from "../constants/collectionIcons";
import { FixedSizeGrid, FixedSizeList } from "./ReactWindowMock";
import AutoSizer from "./AutoSizer";
import { useScrollPersistence } from "../context/ScrollContext";
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

const FixedSizeGridAny = FixedSizeGrid;
const FixedSizeListAny = FixedSizeList;

// --- Grid Cell Renderer ---
const GridCellRenderer = ({ columnIndex, rowIndex, style, data }: any) => {
    const { items, columnCount, navigate, GAP } = data;
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.length) return null;
    const collection = items[index];
    const icon = COLLECTION_ICONS[collection] || "📦";

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
                    onClick={() => navigate(`/collections/${collection}`)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        borderRadius: "24px",
                        cursor: "pointer",
                        height: "100%",
                        border: "4px solid #333",
                        boxShadow: "0 6px 0 #ccc",
                        transition: "transform 0.1s ease, box-shadow 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(4px)";
                        e.currentTarget.style.boxShadow = "0 2px 0 #ccc";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 6px 0 #ccc";
                    }}
                >
                    <span style={{ fontSize: "3rem", marginBottom: "8px" }}>
                        {icon}
                    </span>
                    <span style={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        color: "#333",
                        textAlign: "center",
                        fontFamily: "'Fredoka', 'Fredoka One', sans-serif",
                    }}>
                        {collection}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- List Row Renderer ---
const ListRowRenderer = ({ index, style, data }: any) => {
    const { items, navigate } = data;
    const collection = items[index];
    const icon = COLLECTION_ICONS[collection] || "📦";

    return (
        <div style={{ ...style, padding: "5px 10px", boxSizing: "border-box" }}>
            <div
                onClick={() => navigate(`/collections/${collection}`)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    padding: "8px 15px",
                    height: "calc(100% - 10px)",
                    cursor: "pointer",
                    border: `2px solid #e0e0e0`,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    borderLeft: `6px solid #333`, // Accent color
                    transition: "transform 0.1s active",
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                <div style={{
                    width: "48px",
                    height: "48px",
                    marginRight: "15px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.8rem"
                }}>
                    {icon}
                </div>

                <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        color: "#333",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontFamily: "'Fredoka', 'Fredoka One', sans-serif",
                    }}>
                        {collection}
                    </div>
                </div>

                <div style={{ marginLeft: "10px", color: "#ccc", fontWeight: "bold", fontSize: "1.2rem" }}>
                    ›
                </div>
            </div>
        </div>
    );
};

const CollectionsIndex: React.FC = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState<CollectionName[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const isMobile = windowWidth < 768; // Defined before use
    const { showHeader, handleScroll, scrollRef, headerRef, headerHeight, contentPadding } = useCollapsibleHeader({ deps: [collections] });

    // Pull To Refresh Logic

    // Pull To Refresh Logic
    const { isRefreshing, pullDistance, onTouchStart, onTouchMove, onTouchEnd, updateScrollTop, isDragging } = usePullToRefresh({
        onRefresh: async () => {
            window.location.reload();
        },
        disabled: !isMobile
    });

    const onScroll = (scrollInfo: { scrollOffset?: number, scrollTop?: number, scrollHeight?: number, clientHeight?: number }) => {
        handleScroll(scrollInfo);
        updateScrollTop(scrollInfo.scrollTop ?? scrollInfo.scrollOffset ?? 0);
    };

    useEffect(() => {
        const fetchCollections = async () => {
            const api = new PetSimulator99API();
            const response = await api.getCollections();
            if (response.status === "ok") {
                setCollections(response.data);
            }
        };
        fetchCollections();
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // Scroll Persistence
    const { saveScrollPosition, getScrollPosition } = useScrollPersistence();
    const scrollKey = `collections_index_${viewMode}`;
    // const scrollRef = useRef<number>(0); // Removed duplicate definition
    const initialScrollOffset = getScrollPosition(scrollKey);

    // Save on unmount or key change
    useEffect(() => {
        return () => {
            saveScrollPosition(scrollKey, scrollRef.current);
        };
    }, [saveScrollPosition, scrollKey]);

    useEffect(() => {
        if (isMobile) {
            setViewMode('list');
        } else {
            setViewMode('grid');
        }
    }, [isMobile]);

    const filteredCollections = collections.filter(c =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (collections.length === 0) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#333"
            }}>
                Loading Collections...
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: isMobile ? "100vh" : "calc(100vh - 140px)",
            padding: isMobile ? "0" : "20px",
        }}>
            <div style={{
                width: "100%",
                maxWidth: "1200px",
                height: isMobile ? "100vh" : "80vh",
                backgroundColor: "#fff",
                borderRadius: isMobile ? "0" : "24px",
                boxShadow: isMobile ? "none" : "0 10px 40px rgba(0,0,0,0.2)",
                overflow: "hidden",
                position: "relative",
                border: isMobile ? "none" : "4px solid #333",
                display: "flex",
                flexDirection: "column",
            }}>
                {/* Header */}
                <div
                    ref={headerRef}
                    style={{
                        padding: isMobile ? "10px 15px" : "15px 20px",
                        borderBottom: "4px solid #333",
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? "10px" : "0px",
                        backgroundColor: "#fff",
                        position: "absolute", // Changed to absolute for hiding
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        transition: "transform 0.3s ease-in-out",
                        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: isMobile ? "2rem" : "2.5rem",
                            fontWeight: "900",
                            color: "#333",
                            textShadow: isMobile ? "1px 1px 0px #eee" : "3px 3px 0px #eee",
                            fontFamily: "'Fredoka', 'Fredoka One', sans-serif",
                            letterSpacing: "1px",
                        }}>
                            Collections
                        </h2>

                        {!isMobile && (
                            <div style={{ position: "relative", margin: "0 20px", flex: 1, display: "flex", justifyContent: "flex-end" }}>
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
                                        width: "100%",
                                        maxWidth: "400px",
                                        fontWeight: "800",
                                        backgroundColor: "#f9f9f9",
                                        color: "#333",
                                    }}
                                />
                            </div>
                        )}

                        <button
                            onClick={() => navigate("/")}
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
                                textShadow: "2px 2px 0 #900",
                                marginLeft: isMobile ? "0" : "20px"
                            }}
                        >
                            X
                        </button>
                    </div>

                    {isMobile && (
                        <div style={{ width: "100%" }}>
                            <input
                                type="text"
                                placeholder="Search Collections..."
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
                </div>

                {/* Pull To Refresh Indicator */}
                {(pullDistance > 0 || isRefreshing) && (
                    <div style={{
                        position: 'absolute',
                        top: showHeader ? headerHeight : 0,
                        left: 0,
                        right: 0,
                        height: isRefreshing ? 60 : pullDistance,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        backgroundColor: '#f5f5f5',
                        zIndex: 5,
                        transition: isDragging ? 'none' : 'height 0.3s ease'
                    }}>
                        {isRefreshing ? (
                            <div className="spinner" style={{ width: 24, height: 24, border: '3px solid #ccc', borderTopColor: '#333', borderRadius: '50%' }}></div>
                        ) : (
                            <span style={{ opacity: Math.min(pullDistance / 60, 1), transform: `rotate(${pullDistance * 2}deg)` }}>
                                ⬇️
                            </span>
                        )}
                    </div>
                )}

                {/* Content */}
                <div style={{ height: "100%", width: "100%", flex: 1, paddingTop: isMobile ? contentPadding : "0px", transition: "padding-top 0.3s ease-in-out" }}>
                    {/* @ts-ignore */}
                    <AutoSizer style={{ width: "100%", height: "100%" }} renderProp={({ height, width }: { height: number, width: number }) => {
                        const GAP = 20;

                        if (viewMode === 'list') {
                            return (
                                <FixedSizeListAny
                                    height={height}
                                    itemCount={filteredCollections.length}
                                    itemSize={80}
                                    width={width}
                                    initialScrollOffset={initialScrollOffset}
                                    onScroll={onScroll}
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                    itemData={{
                                        items: filteredCollections,
                                        navigate
                                    }}
                                >
                                    {ListRowRenderer}
                                </FixedSizeListAny>
                            );
                        } else {
                            // Grid Mode
                            const MIN_COL_WIDTH = 180;
                            const SCROLLBAR_WIDTH = 40;
                            const effectiveWidth = width - SCROLLBAR_WIDTH;
                            const columnCount = Math.floor(effectiveWidth / MIN_COL_WIDTH) || 1;
                            const columnWidth = effectiveWidth / columnCount;
                            const rowHeight = 220; // Aspect ratio ~1:1 plus padding
                            const rowCount = Math.ceil(filteredCollections.length / columnCount);

                            return (
                                <FixedSizeGridAny
                                    columnCount={columnCount}
                                    columnWidth={columnWidth}
                                    height={height}
                                    rowCount={rowCount}
                                    rowHeight={rowHeight}
                                    width={width}
                                    initialScrollOffset={initialScrollOffset}
                                    onScroll={onScroll}
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                    itemData={{
                                        items: filteredCollections,
                                        columnCount,
                                        navigate,
                                        GAP
                                    }}
                                >
                                    {GridCellRenderer}
                                </FixedSizeGridAny>
                            );
                        }
                    }} />
                </div>
            </div>
        </div>
    );
};

export default CollectionsIndex;
