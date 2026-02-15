import React, { createContext, useContext, useRef, useCallback } from 'react';

interface ScrollContextType {
    scrollPositions: React.MutableRefObject<Record<string, number>>;
    saveScrollPosition: (key: string, offset: number) => void;
    getScrollPosition: (key: string) => number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollPositions = useRef<Record<string, number>>({});

    const saveScrollPosition = useCallback((key: string, offset: number) => {
        scrollPositions.current[key] = offset;
    }, []);

    const getScrollPosition = useCallback((key: string) => {
        return scrollPositions.current[key] || 0;
    }, []);

    return (
        <ScrollContext.Provider value={{ scrollPositions, saveScrollPosition, getScrollPosition }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollPersistence = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScrollPersistence must be used within a ScrollProvider");
    }
    return context;
};
