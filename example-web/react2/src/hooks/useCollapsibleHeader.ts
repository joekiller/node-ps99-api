import { useState, useRef, useEffect } from 'react';

interface UseCollapsibleHeaderOptions {
    defaultHeight?: number;
    triggerStart?: number; // Scroll position to start checking
    threshold?: number;   // Scroll delta threshold
    deps?: any[];         // Dependencies to re-run the ResizeObserver effect
}

export const useCollapsibleHeader = (options: UseCollapsibleHeaderOptions = {}) => {
    const { defaultHeight = 120, triggerStart = 50, threshold = 10, deps = [] } = options;

    // Header Visibility Logic
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollTop = useRef(0);
    const scrollRef = useRef<number>(0);

    const handleScroll = ({ scrollOffset, scrollTop }: { scrollOffset?: number, scrollTop?: number }) => {
        const currentScrollTop = scrollTop ?? scrollOffset ?? 0;
        const scrollDelta = currentScrollTop - lastScrollTop.current;

        // Threshold to prevent jitter
        if (Math.abs(scrollDelta) > threshold) {
            if (scrollDelta > 0 && currentScrollTop > triggerStart) {
                // Scrolling Down & checked some distance
                setShowHeader(false);
            } else if (scrollDelta < 0) {
                // Scrolling Up
                setShowHeader(true);
            }
        }
        lastScrollTop.current = currentScrollTop;
        scrollRef.current = currentScrollTop;
    };

    // Dynamic Header Height Logic
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(defaultHeight);
    const [isMeasured, setIsMeasured] = useState(false);

    useEffect(() => {
        if (!headerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target.clientHeight > 0) {
                    setHeaderHeight(entry.target.clientHeight);
                    setIsMeasured(true);
                }
            }
        });

        resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect();
    }, deps);

    const contentPadding = showHeader ? `${headerHeight + 5}px` : "0px";

    return {
        showHeader,
        setShowHeader,
        handleScroll,
        scrollRef,
        headerRef,
        headerHeight,
        contentPadding,
        isMeasured
    };
};
