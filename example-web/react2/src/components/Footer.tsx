import React, { useState, useEffect } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const Footer: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
        borderTop: "1px solid #ccc",
      }}
    >
      <div>
        {loading ? (
          <span>♻️ Loading...</span>
        ) : (
          <span>Last update: {lastUpdate}</span>
        )}
      </div>
      <div>
        {isOnline ? (
          <span style={{ color: "green" }}>● Online</span>
        ) : (
          <span style={{ color: "red" }}>● Offline</span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
