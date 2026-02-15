import { useState, useEffect, useRef } from 'react';

interface PullToRefreshOptions {
    onRefresh: () => Promise<void> | void;
    threshold?: number; // px to pull down to trigger
    disabled?: boolean;
    overrideScrollCheck?: (e: React.TouchEvent) => boolean;
}

export const usePullToRefresh = ({ onRefresh, threshold = 80, disabled = false, overrideScrollCheck }: PullToRefreshOptions) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const startY = useRef<number>(0);
    const isDragging = useRef(false);

    // We need to know the scroll position to only allow pull when at top
    const scrollTopRef = useRef(0);

    const isOverrideActive = useRef(false);

    const onTouchStart = (e: React.TouchEvent) => {
        if (disabled) return;
        const shouldOverride = overrideScrollCheck ? overrideScrollCheck(e) : false;
        if (scrollTopRef.current === 0 || shouldOverride) {
            startY.current = e.touches[0].clientY;
            isDragging.current = true;
            isOverrideActive.current = shouldOverride;
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        if (scrollTopRef.current > 0 && !isOverrideActive.current) {
            isDragging.current = false;
            setPullDistance(0);
            return;
        }

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;

        if (diff > 0) {
            // Resistance effect
            setPullDistance(Math.min(diff * 0.5, threshold * 1.5));
            // Prevent native scroll if we are pulling down? 
            // Might interfere with normal scrolling if not careful.
            // But since scrollTop is 0, pulling down usually does nothing in overflow:auto unless overscroll-behavior is set.
        }
    };

    const onTouchEnd = async () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        if (pullDistance > threshold) {
            setIsRefreshing(true);
            setPullDistance(threshold); // Snap to threshold
            try {
                await onRefresh();
            } finally {
                setIsRefreshing(false);
                setPullDistance(0);
            }
        } else {
            setPullDistance(0);
        }
    };

    const updateScrollTop = (val: number) => {
        scrollTopRef.current = val;
    };

    // Expose boolean for UI
    const [isDraggingState, setIsDraggingState] = useState(false);

    // Sync ref to state for UI (optional, or just use state)
    // Actually, let's just use state for the critical UI part if needed, 
    // but typically we want ref for perf on touchmove. 
    // Let's just return a getter or similar? 
    // Simplest: just don't use isDragging for the transition logic in the UI, or use pullDistance === 0 check.

    // Correction: In proper PTR, you want no transition during drag, but transition on release.
    // So we need to know if we are dragging.

    return {
        isRefreshing,
        pullDistance,
        onTouchStart: (e: React.TouchEvent) => { onTouchStart(e); setIsDraggingState(true); },
        onTouchMove,
        onTouchEnd: async () => { setIsDraggingState(false); await onTouchEnd(); },
        updateScrollTop,
        isDragging: isDraggingState
    };
};
