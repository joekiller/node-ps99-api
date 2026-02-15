import React, { useState } from "react";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [active, setActive] = useState(false);

    const showTip = () => {
        setActive(true);
    };

    const hideTip = () => {
        setActive(false);
    };

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
            {active && (
                <div className="tooltip-popover">
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
