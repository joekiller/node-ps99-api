import React, { useEffect, useState } from "react";
import { PetSimulator99API } from "ps99-api";

interface ImageProps {
  src: string;
  alt: string;
}

const MAX_CONCURRENT_REQUESTS = 5;
const requestQueue: Array<() => void> = [];
let activeRequests = 0;

const processQueue = () => {
  if (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    if (nextRequest) {
      activeRequests++;
      nextRequest();
    }
  }
};

const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const api = new PetSimulator99API();
      try {
        const imageBlob = await api.getImage(src);
        const url = URL.createObjectURL(
          new Blob([imageBlob], { type: "image/png" }),
        );
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        activeRequests--;
        processQueue();
      }
    };

    const requestImage = () => {
      fetchImage();
    };

    requestQueue.push(requestImage);
    processQueue();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [src]);

  return (
    <div>{imageUrl ? <img src={imageUrl} alt={alt} /> : <p>Loading...</p>}</div>
  );
};

export default ImageComponent;
