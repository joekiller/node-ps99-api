import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar"; // REMOVED per user request
import { useParams } from "react-router-dom";
import { CollectionDataProvider } from "../context/CollectionDataContext";

const CollectionsLayout: React.FC = () => {
    const { collectionName } = useParams<{ collectionName: string }>();

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: isMobile ? "100vh" : "calc(100vh - 80px)",
                padding: isMobile ? "0" : "10px",
                height: "100%",
                boxSizing: "border-box"
            }}
        >
            <CollectionDataProvider>
                {/* Main Window Container - Lifted from CollectionConfigIndex */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        maxWidth: "1200px",
                        height: isMobile ? "100vh" : "85vh",
                        backgroundColor: "#fff",
                        borderRadius: isMobile ? "0" : "16px",
                        boxShadow: isMobile ? "none" : "0 10px 40px rgba(0,0,0,0.2)",
                        overflow: "hidden",
                        position: "relative",
                        border: isMobile ? "none" : "3px solid #333",
                        flexDirection: "column"
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
