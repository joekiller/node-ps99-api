import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PetSimulator99API, CollectionName } from "ps99-api";

import { COLLECTION_ICONS } from "../constants/collectionIcons";


interface SidebarProps {
    currentCollection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentCollection }) => {
    const [collections, setCollections] = useState<CollectionName[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const api = new PetSimulator99API();
            const response = await api.getCollections();
            if (response.status === "ok") {
                // Filter out collections that might not have icons or just to keep it clean if needed
                setCollections(response.data);
            }
        };
        fetchCollections();
    }, []);

    return (
        <div style={{
            width: "260px",
            backgroundColor: "#fff",
            borderRight: "4px solid #333",
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            gap: "10px",
            flexShrink: 0,
            overflowY: "auto",
            maxHeight: "100%",
        }}>
            <h3 style={{
                textAlign: "center",
                marginBottom: "15px",
                color: "#333",
                fontSize: "1.5rem",
                fontWeight: "900",
                textShadow: "2px 2px 0px #eee",
                fontFamily: "'Fredoka One', cursive, sans-serif", // Assuming font availability or fallback
            }}>
                Terminal!
            </h3>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
            }}>
                {collections.map((collection) => {
                    const isActive = currentCollection === collection;
                    const icon = COLLECTION_ICONS[collection] || "📦";

                    return (
                        <Link
                            key={collection}
                            to={`/collections/${collection}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                aspectRatio: "1/1",
                                backgroundColor: isActive ? "#00b894" : "#dfe6e9",
                                borderRadius: "16px",
                                textDecoration: "none",
                                color: isActive ? "#fff" : "#2d3436",
                                border: "3px solid #333",
                                boxShadow: isActive ? "inset 0 -4px 0 rgba(0,0,0,0.2)" : "0 4px 0 #b2bec3",
                                transition: "all 0.1s ease",
                                transform: isActive ? "translateY(2px)" : "translateY(0)",
                            }}
                        >
                            <span style={{
                                fontSize: "2rem",
                                marginBottom: "4px",
                                filter: isActive ? "drop-shadow(0 2px 0 rgba(0,0,0,0.2))" : "none"
                            }}>
                                {icon}
                            </span>
                            <span style={{
                                fontSize: "0.8rem",
                                fontWeight: "800",
                                textAlign: "center",
                                lineHeight: "1.1",
                                textShadow: isActive ? "1px 1px 0 rgba(0,0,0,0.2)" : "none"
                            }}>
                                {collection}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
