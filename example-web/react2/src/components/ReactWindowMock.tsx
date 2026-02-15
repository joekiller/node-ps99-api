import React, { useRef, useEffect } from 'react';

export const FixedSizeList = ({ children, itemCount, itemSize, height, width, onScroll, initialScrollOffset, itemData }: any) => {
    const items = [];
    for (let i = 0; i < itemCount; i++) {
        items.push(
            <div key={i} style={{ width: "100%" }}>
                {children({ index: i, style: { height: itemSize, width: "100%" }, data: itemData })}
            </div>
        );
    }

    // Handle initial scroll
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current && (initialScrollOffset !== undefined && initialScrollOffset !== null)) {
            ref.current.scrollTop = initialScrollOffset;
        }
    }, [initialScrollOffset]);

    return (
        <div
            ref={ref}
            style={{ height, width, overflow: "auto", position: 'relative' }}
            onScroll={(e) => onScroll && onScroll({ scrollOffset: e.currentTarget.scrollTop })}
        >
            {items}
        </div>
    );
};

export const FixedSizeGrid = ({ children, columnCount, rowCount, columnWidth, rowHeight, height, width, onScroll, initialScrollOffset, itemData, style }: any) => {
    const items = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            items.push(
                <div key={`${rowIndex}-${columnIndex}`} style={{ position: 'absolute' }}>
                    {children({
                        columnIndex,
                        rowIndex,
                        style: {
                            position: 'absolute',
                            left: columnIndex * columnWidth,
                            top: rowIndex * rowHeight,
                            height: rowHeight,
                            width: columnWidth
                        },
                        data: itemData
                    })}
                </div>
            );
        }
    }
    // Handle initial scroll
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current && initialScrollOffset) {
            ref.current.scrollTop = initialScrollOffset;
        }
    }, [initialScrollOffset]);

    return (
        <div
            ref={ref}
            style={{ height, width, overflowY: "auto", overflowX: "hidden", position: 'relative', ...style }}
            onScroll={(e) => onScroll && onScroll({ scrollTop: e.currentTarget.scrollTop })}
        >
            <div style={{ height: rowCount * rowHeight, width: columnWidth * columnCount }}>
                {items}
            </div>
        </div>
    );
};
