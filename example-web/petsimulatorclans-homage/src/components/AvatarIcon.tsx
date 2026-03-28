import React, { useState } from 'react';

const AvatarIcon: React.FC<{ userId?: number, className?: string, style?: React.CSSProperties }> = ({ userId, className, style }) => {
    const [error, setError] = useState(false);
    const fallback = "https://raw.githubusercontent.com/AndreyOnDemand/psclansassets/main/images/me.png";

    if (!userId) return <img src={fallback} className={className} style={style} alt="avatar" />;

    const url = error ? fallback : `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;

    return <img src={url} className={className} style={style} alt="avatar" onError={() => setError(true)} />;
};

export default AvatarIcon;
