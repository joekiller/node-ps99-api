import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const Footer: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isCollectionsRoute = location.pathname.startsWith("/collections");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const updateLastUpdate = () => {
    setLastUpdate(new Date().toLocaleString());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate a fetch call to update lastUpdate time
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateLastUpdate();
      setLoading(false);
    };

    fetchData();

    window.addEventListener("online", updateLastUpdate);
    window.addEventListener("offline", updateLastUpdate);

    return () => {
      window.removeEventListener("online", updateLastUpdate);
      window.removeEventListener("offline", updateLastUpdate);
    };
  }, []);

  if (isMobile && isCollectionsRoute) {
    return null;
  }

  return (
    <footer className="game-footer">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <a
          href="https://badge.fury.io/js/ps99-api"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://badge.fury.io/js/ps99-api.svg"
            alt="npm version"
            height="18"
          />
        </a>
        &nbsp;
        <a
          href="https://github.com/joekiller/node-ps99-api"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://img.shields.io/badge/source-github-blue?logo=github"
            alt="GitHub source"
            height="18"
          />
        </a>
        &nbsp;
        <div style={{ display: "flex", alignItems: "center", height: "18px" }}>
          {isOnline ? (
            <span style={{ color: "green", lineHeight: "18px" }}>● Online</span>
          ) : (
            <span style={{ color: "red", lineHeight: "18px" }}>● Offline</span>
          )}
        </div>
      </div>
      <div style={{ marginBottom: "1em" }}>
        {loading ? (
          <span>♻️ Loading...</span>
        ) : (
          <span>Last update: {lastUpdate}</span>
        )}
      </div>
      <div>
        <p>
          &copy; {new Date().getFullYear()} Joseph "
          <a
            href="https://joekiller.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            joekiller
          </a>
          " Lawson. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
