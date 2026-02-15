import React, { lazy, Suspense, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CollectionName, CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";

interface DynamicCollectionConfigDataProps {
  collectionName?: CollectionName;
  configName?: string;
  render?: (configData: CollectionConfigData<any>) => React.ReactNode; // Add render prop
  additionalProps?: any; // Add additional props to pass to the rendered component
}

const DynamicCollectionConfigData: React.FC<
  DynamicCollectionConfigDataProps
> = (props) => {
  const params = useParams<{
    collectionName: CollectionName;
    configName: string;
  }>();

  const navigate = useNavigate();
  const collectionName = props.collectionName || params.collectionName;
  const configName = props.configName || params.configName;

  const [viewMode, setViewMode] = useState<'render' | 'schema'>('render');

  /*
   * We need to use useMemo here to prevent the component from being re-created
   * on every render. This usage of useMemo is safe because the import path
   * depends only on collectionName, and we want to re-create the component
   * only when collectionName changes.
   */
  /*
   * We need to use useMemo here to prevent the component from being re-created
   * on every render. This usage of useMemo is safe because the import path
   * depends only on collectionName, and we want to re-create the component
   * only when collectionName changes.
   */
  const Component = React.useMemo(() => {
    if (!collectionName) return null;
    // Capitalize first letter to match file naming convention (e.g. "pets" -> "Pets")
    // This fixes issues where navigation uses lowercase but files are Capitalized
    const formattedName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
    return lazy(() => import(`./${formattedName}Component`));
  }, [collectionName]);

  if (!collectionName || !configName || !Component) {
    return <div>Invalid collection or config name</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      {/* Header with Close Button */}
      <div style={{
        padding: "15px 20px",
        borderBottom: "4px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexShrink: 0,
      }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            // visual feedback could be added here, e.g. a small alert or changing the icon color briefly
            const icon = document.getElementById('link-icon-path');
            if (icon) icon.style.fill = '#4caf50';
            setTimeout(() => { if (icon) icon.style.fill = '#ccc'; }, 1000);
          }}
          title="Click to copy link to this item"
          onMouseEnter={(e) => {
            const icon = e.currentTarget.querySelector('.link-icon');
            if (icon) (icon as HTMLElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            const icon = e.currentTarget.querySelector('.link-icon');
            if (icon) (icon as HTMLElement).style.opacity = '0';
          }}
        >
          <h2 style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: "900",
            color: "#333",
            textShadow: "2px 2px 0px #eee",
            fontFamily: "'Fredoka', 'Fredoka One', sans-serif",
            textTransform: "capitalize",
          }}>
            {configName}
          </h2>
          <svg
            className="link-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0, transition: 'opacity 0.2s' }}
          >
            <path id="link-icon-path" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setViewMode(prev => prev === 'render' ? 'schema' : 'render')}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: viewMode === 'render' ? "#2196f3" : "#4caf50",
              color: "white",
              border: `4px solid ${viewMode === 'render' ? "#1565c0" : "#2e7d32"}`,
              fontSize: "20px",
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: `inset 0 4px 4px rgba(255,255,255,0.4), 0 4px 0 ${viewMode === 'render' ? "#0d47a1" : "#1b5e20"}`,
              fontFamily: "monospace"
            }}
            title={viewMode === 'render' ? "View Raw Schema" : "View Rendered Item"}
          >
            {viewMode === 'render' ? "{}" : "👁️"}
          </button>

          <button
            onClick={() => navigate(`/collections/${collectionName}`)}
            style={{
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
              cursor: "pointer",
              boxShadow: "inset 0 4px 4px rgba(255,255,255,0.4), 0 4px 0 #500",
            }}
          >
            X
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <GenericFetchComponent
            // We use the key prop to force a re-mount of the component when the
            // collectionName or configName changes. This ensures that the internal
            // state of the GenericFetchComponent is reset and the new data is
            // fetched correctly, preventing stale data from being passed to the
            // child component.
            key={`${collectionName}-${configName}`}
            collectionName={collectionName}
            configName={configName}
            render={
              (configData: CollectionConfigData<any>) => {
                if (viewMode === 'schema') {
                  return (
                    <div style={{
                      padding: '20px',
                      background: '#1e1e1e',
                      color: '#d4d4d4',
                      borderRadius: '12px',
                      overflow: 'auto',
                      height: '100%',
                      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                      border: '2px solid #333'
                    }}>
                      <pre style={{ margin: 0 }}>{JSON.stringify(configData, null, 2)}</pre>
                    </div>
                  );
                }
                return props.render ? props.render(configData) : <Component configData={configData} {...props.additionalProps} />;
              }
            } // Use render prop if provided
          />
        </Suspense>
      </div>
    </div>
  );
};

export default DynamicCollectionConfigData;
