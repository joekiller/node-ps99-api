import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePullToRefresh } from "../hooks/usePullToRefresh";

const HomePage: React.FC = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Pull To Refresh Logic
  const { isRefreshing, pullDistance, onTouchStart, onTouchMove, onTouchEnd, updateScrollTop, isDragging } = usePullToRefresh({
    onRefresh: async () => {
      window.location.reload();
    },
    disabled: !isMobile
  });

  // Track window scroll for PTR
  useEffect(() => {
    const handleScroll = () => {
      updateScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollTop]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "4em",
        marginTop: "50px",
        minHeight: 'calc(100vh - 100px)', // Ensure full height for touch target
        position: 'relative'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull To Refresh Indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isRefreshing ? 60 : pullDistance,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent', // Transparent on home page? Or match bg? Home bg is white/default.
          zIndex: 5,
          transition: isDragging ? 'none' : 'height 0.3s ease'
        }}>
          {isRefreshing ? (
            <div className="spinner" style={{ width: 24, height: 24, border: '3px solid #ccc', borderTopColor: '#333', borderRadius: '50%' }}></div>
          ) : (
            <span style={{ opacity: Math.min(pullDistance / 60, 1), transform: `rotate(${pullDistance * 2}deg)`, fontSize: '24px' }}>
              ⬇️
            </span>
          )}
        </div>
      )}

      <h1 style={{ fontSize: "3rem", marginBottom: "0.5em", color: "var(--primary-color)", textShadow: "4px 4px 0px var(--border-color)" }}>
        Pet Simulator 99
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2em" }}>
        Explore the world of Pet Simulator 99! Check out all the items, pets, and collections.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link
          to="/collections"
          className="game-button"
        >
          Collections
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
