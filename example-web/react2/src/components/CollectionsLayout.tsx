import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar"; // REMOVED per user request
import { useParams } from "react-router-dom";
import { CollectionDataProvider } from "../context/CollectionDataContext";

const CollectionsLayout: React.FC = () => {
    const { collectionName } = useParams<{ collectionName: string }>();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 140px)", // Matches previous main container spacing
                padding: "20px",
                // backgroundColor: "rgba(0,0,0,0.05)", // REMOVED
            }}
        >
            <CollectionDataProvider>
                {/* Main Window Container - Lifted from CollectionConfigIndex */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        maxWidth: "1200px",
                        height: "80vh",
                        backgroundColor: "#fff",
                        borderRadius: "24px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                        overflow: "hidden",
                        position: "relative",
                        border: "4px solid #333",
                    }}
                >
                    {/* Persistent Sidebar REMOVED */}
                    {/* <Sidebar currentCollection={collectionName} /> */}

                    {/* Content Area */}
                    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <Outlet />
                    </div>
                </div>
            </CollectionDataProvider>
        </div>
    );
};

export default CollectionsLayout;
