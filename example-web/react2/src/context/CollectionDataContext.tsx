import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PetSimulator99API, Collections, CollectionName } from "ps99-api";

const api = new PetSimulator99API();

type CollectionDataCache = Partial<Record<string, Collections[]>>;

interface CollectionDataContextType {
    data: CollectionDataCache;
    fetchCollection: (collectionName: CollectionName) => Promise<void>;
    isLoading: (collectionName: string) => boolean;
}

const CollectionDataContext = createContext<CollectionDataContextType | undefined>(undefined);

export const CollectionDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<CollectionDataCache>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const fetchCollection = useCallback(async (collectionName: CollectionName) => {
        // If data already exists, don't fetch again unless force refresh is needed (not implemented yet)
        if (data[collectionName]) {
            return;
        }

        if (loadingStates[collectionName]) return; // Already loading

        setLoadingStates(prev => ({ ...prev, [collectionName]: true }));

        try {
            console.log(`[CollectionDataContext] Fetching ${collectionName}...`);
            const result = await api.getCollection(collectionName);
            if (result.status === "ok") {
                setData(prev => ({ ...prev, [collectionName]: result.data as Collections[] }));
            } else {
                console.error(`Status error fetching ${collectionName}:`, result);
            }
        } catch (error) {
            console.error(`Failed to fetch collection ${collectionName}`, error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [collectionName]: false }));
        }
    }, [data, loadingStates]);

    const isLoading = useCallback((collectionName: string) => {
        return !!loadingStates[collectionName];
    }, [loadingStates]);

    return (
        <CollectionDataContext.Provider value={{ data, fetchCollection, isLoading }}>
            {children}
        </CollectionDataContext.Provider>
    );
};

export const useCollectionData = () => {
    const context = useContext(CollectionDataContext);
    if (!context) {
        throw new Error('useCollectionData must be used within a CollectionDataProvider');
    }
    return context;
};
