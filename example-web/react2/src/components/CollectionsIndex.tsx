import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PetSimulator99API, CollectionName } from "ps99-api";
import { COLLECTION_ICONS } from "../constants/collectionIcons";

const CollectionsIndex: React.FC = () => {
    const [collections, setCollections] = useState<CollectionName[]>([]);

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

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 140px)", // Matches CollectionsLayout outer container spacing
                padding: "20px",
                // backgroundColor: "rgba(0,0,0,0.05)", // REMOVED
            }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1200px", // Match CollectionsLayout
                height: "80vh",    // Match CollectionsLayout
                backgroundColor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                overflow: "hidden", // Important for internal scrolling
                position: "relative",
                border: "4px solid #333",
                display: "flex",
                flexDirection: "column",
            }}>
                <div style={{ position: "relative", textAlign: "center", margin: "20px 0" }}>
                    <h1 style={{
                        fontFamily: "'Fredoka One', cursive, sans-serif",
                        fontSize: "3rem",
                        color: "#333",
                        margin: 0,
                        textShadow: "4px 4px 0px #eee",
                        display: "inline-block",
                    }}>
                        Select a Collection
                    </h1>

                    {/* Home Button (X) */}
                    <Link
                        to="/"
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            backgroundColor: "#ff0055",
                            color: "white",
                            border: "4px solid #900",
                            fontSize: "24px",
                            fontWeight: "900",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            boxShadow: "inset 0 4px 4px rgba(255,255,255,0.4), 0 4px 0 #500",
                        }}
                    >
                        X
                    </Link>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px",
                    padding: "0 40px 40px 40px",
                    overflowY: "auto", // Allow grid to scroll INSIDE the box
                    flex: 1,
                }}>
                    {collections.map((collection, index) => {
                        const icon = COLLECTION_ICONS[collection] || "📦";

                        return (
                            <Link
                                to={`/collections/${collection}`}
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#fff",
                                    borderRadius: "24px",
                                    padding: "15px",
                                    textDecoration: "none",
                                    border: "4px solid #333",
                                    boxShadow: "0 6px 0 #ccc",
                                    transition: "transform 0.1s ease, box-shadow 0.1s ease",
                                    aspectRatio: "1/1",
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
                                    fontFamily: "'Fredoka One', cursive, sans-serif",
                                }}>
                                    {collection}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CollectionsIndex;
