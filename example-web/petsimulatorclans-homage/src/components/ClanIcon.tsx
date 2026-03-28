import React, { useState } from 'react';

const ClanIcon: React.FC<{ iconStr?: string, className?: string, style?: React.CSSProperties }> = ({ iconStr, className, style }) => {
    const [error, setError] = useState(false);
    const fallback = "https://raw.githubusercontent.com/AndreyOnDemand/psclansassets/main/images/clans.webp";

    if (!iconStr) return <img src={fallback} className={className} style={style} alt="clan icon" />;

    const assetId = iconStr.replace('rbxassetid://', '');
    const url = error ? fallback : `https://biggamesapi.io/image/${assetId}`;

    return <img src={url} className={className} style={style} alt="clan icon" onError={() => setError(true)} />;
};

export default ClanIcon;
