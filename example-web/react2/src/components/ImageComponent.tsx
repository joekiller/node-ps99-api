import React, { useEffect, useState, useRef } from "react";
import { PetSimulator99API } from "ps99-api";
import { get, set, del } from "idb-keyval";

interface ImageProps {
    src: string;
    alt: string;
    style?: React.CSSProperties;
}

// Global Queue State
const MAX_CONCURRENT_REQUESTS = 5;
const MIN_CONCURRENT_REQUESTS = 1;
let currentConcurrencyLimit = MAX_CONCURRENT_REQUESTS;

interface QueueItem {
    src: string;
    resolve: (blob: Blob) => void;
    reject: (err: any) => void;
    retries: number;
}

const requestQueue: QueueItem[] = [];
let activeRequests = 0;
let isPaused = false;
let pauseTimeout: NodeJS.Timeout | null = null;
let backoffDelay = 2000; // Start at 2s
let consecutiveErrors = 0;

// Map to dedupe requests: src -> Promise<Blob>
const pendingRequests = new Map<string, Promise<Blob>>();

const processQueue = () => {
    if (isPaused || activeRequests >= currentConcurrencyLimit || requestQueue.length === 0) {
        return;
    }

    const request = requestQueue.shift();
    if (!request) return;

    activeRequests++;
    const { src, resolve, reject, retries } = request;

    // Use empty string as baseUrl to force relative paths (which hit the webpack proxy)
    // This is the "shim" layer making it seamless for the component
    const api = new PetSimulator99API({ baseUrl: "" });

    api.getImage(src)
        .then((data: any) => {
            const blob = new Blob([data], { type: "image/png" });
            resolve(blob);
            set(`img-cache-${src}`, blob).catch(err => console.error("Cache set failed", err));

            // Success: Reset backoff and slowly ramp up concurrency
            consecutiveErrors = 0;
            backoffDelay = 2000;
            if (currentConcurrencyLimit < MAX_CONCURRENT_REQUESTS) {
                currentConcurrencyLimit++;
            }
        })
        .catch((error: any) => {
            console.error(`[ImageComponent] Failed ${src}`, error);

            // Check for 429 or other rate limit errors
            const isRateLimit = error?.response?.status === 429 || error?.status === 429;

            if (isRateLimit) {
                consecutiveErrors++;
                console.warn(`Rate limit hit (429). Backoff: ${backoffDelay}ms. Concurrency: ${currentConcurrencyLimit}`);

                // Throttle concurrency
                currentConcurrencyLimit = MIN_CONCURRENT_REQUESTS;

                // Backoff logic
                handleRateLimit();

                // Retry if under limit
                if (retries < 3) {
                    requestQueue.unshift({ ...request, retries: retries + 1 });
                    return;
                }
            }
            // If not rate limit, or max retries exceeded, reject
            reject(error);
        })
        .finally(() => {
            activeRequests--;
            processQueue();
        });
};

const handleRateLimit = () => {
    if (isPaused) return;
    isPaused = true;

    if (pauseTimeout) clearTimeout(pauseTimeout);

    pauseTimeout = setTimeout(() => {
        isPaused = false;
        // Increase backoff for next time (Exponential)
        backoffDelay = Math.min(backoffDelay * 2, 60000); // Cap at 60s
        processQueue();
    }, backoffDelay);
};


// Helper to fetch blob with deduping
const fetchImageBlob = (src: string): Promise<Blob> => {
    if (pendingRequests.has(src)) {
        return pendingRequests.get(src)!;
    }

    const promise = new Promise<Blob>((resolve, reject) => {
        requestQueue.push({ src, resolve, reject, retries: 0 });
        processQueue();
    }).finally(() => {
        pendingRequests.delete(src);
    });

    pendingRequests.set(src, promise);
    return promise;
};

const ImageComponent: React.FC<ImageProps> = ({ src, alt, style }) => {
    // console.log(`[ImageComponent] Mounting for ${src}`); // Commented out to reduce noise, enable if needed
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        // Reset state on src change
        setImageUrl(null);
        setIsLoading(true);
        setHasError(false);

        // Check for local assets or full URLs (non-api)
        if (src.startsWith("/") || src.startsWith("http")) {
            setImageUrl(src);
            setIsLoading(false);
            return;
        }

        const load = async () => {
            try {
                // 1. Try Cache
                try {
                    const cached = await get<Blob>(`img-cache-${src}`);
                    if (cached && cached instanceof Blob) {
                        if (mountedRef.current) {
                            const url = URL.createObjectURL(cached);
                            setImageUrl(url);
                            setIsLoading(false);
                            return;
                        }
                    } else if (cached) {
                        await del(`img-cache-${src}`);
                    }
                } catch (idbErr) {
                    // console.error(`[ImageComponent] IDB Error for ${src}:`, idbErr);
                }

                if (!mountedRef.current) return;

                // 2. Fetch Network
                const blob = await fetchImageBlob(src);
                if (mountedRef.current) {
                    if (blob instanceof Blob) {
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                        setIsLoading(false);
                    } else {
                        console.error("Fetched data is not a Blob:", blob);
                        setHasError(true);
                        setIsLoading(false);
                    }
                }
            } catch (err: any) {
                if (mountedRef.current) {
                    // console.error(`[ImageComponent] Load failed for ${src}:`, err);
                    setHasError(true);
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            mountedRef.current = false;
        };
    }, [src]);

    if (hasError) {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '8px',
                color: '#aaa',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                ...style // Preserve layout styles
            }}>
                ?
            </div>
        );
    }

    if (imageUrl) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
                animation: "fadeIn 0.3s ease-in-out", // Smooth fade-in
            }}>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}</style>
                <img
                    src={imageUrl}
                    alt={alt}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                        ...style
                    }}
                    onError={() => {
                        setImageUrl(null);
                        setHasError(true);
                    }}
                />
            </div>
        );
    }

    // Loading State (Skeleton)
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
            borderRadius: '8px',
            animation: 'pulse 1.5s infinite ease-in-out',
            ...style
        }}>
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

export default ImageComponent;
