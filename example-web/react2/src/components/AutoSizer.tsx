import React, { useState, useLayoutEffect, useRef } from "react";

export default function AutoSizer({
    children,
    className,
    defaultHeight,
    defaultWidth,
    style,
    renderProp,
    ...rest
}: any) {
    const [size, setSize] = useState({ height: defaultHeight || 0, width: defaultWidth || 0 });
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ResizeObserver = (window as any).ResizeObserver;
        if (!ResizeObserver) return;

        const observer = new ResizeObserver((entries: any) => {
            for (const entry of entries) {
                if (entry.contentRect) {
                    const { width, height } = entry.contentRect;
                    // Rounding for stability
                    setSize({ width: Math.floor(width), height: Math.floor(height) });
                }
            }
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const childParams = size;

    // Render prop takes precedence if provided (based on my usage in other files)
    const content = renderProp
        ? renderProp(childParams)
        : (typeof children === 'function' ? children(childParams) : children);

    return (
        <div className={className} ref={ref} style={{ ...style, width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Only render content if we have size, or if default provided to avoid jumpiness */}
            {(size.width > 0 && size.height > 0) ? content : null}
        </div>
    );
}
