import { useState, useCallback, useEffect } from 'react';

export const useExpandableList = (totalItems: number, initialExpanded: boolean = false) => {
    const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

    // Initialize state when totalItems changes or on mount
    useEffect(() => {
        if (initialExpanded) {
            setExpandedIndices(new Set(Array.from({ length: totalItems }, (_, i) => i)));
        } else {
            setExpandedIndices(new Set());
        }
    }, [totalItems, initialExpanded]);

    const toggle = useCallback((index: number) => {
        setExpandedIndices(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    }, []);

    const expandAll = useCallback(() => {
        setExpandedIndices(new Set(Array.from({ length: totalItems }, (_, i) => i)));
    }, [totalItems]);

    const collapseAll = useCallback(() => {
        setExpandedIndices(new Set());
    }, []);

    const isExpanded = useCallback((index: number) => expandedIndices.has(index), [expandedIndices]);

    return { expandedIndices, toggle, expandAll, collapseAll, isExpanded };
};
