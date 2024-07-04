import React, { useEffect, useState } from "react";
import { PetSimulator99API } from "ps99-api";

interface ImageProps {
  src: string;
  alt: string;
}

const MAX_CONCURRENT_REQUESTS = 5;
let currentRequests = 0;
const queue: (() => void)[] = [];

const processQueue = () => {
  if (queue.length > 0 && currentRequests < MAX_CONCURRENT_REQUESTS) {
    const nextRequest = queue.shift();
    if (nextRequest) {
      currentRequests++;
      nextRequest();
    }
  }
};

const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const api = new PetSimulator99API();
        const imageBlob = await api.getImage(src);
        const imageUrl = URL.createObjectURL(
          new Blob([imageBlob], { type: "image/png" }),
        );
        setImageUrl(imageUrl);
      } catch (error) {
        setError("Error fetching image");
        console.error("Error fetching image:", error);
      } finally {
        currentRequests--;
        processQueue();
      }
    };

    const load = () => {
      fetchImage();
    };

    queue.push(load);
    processQueue();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [src, imageUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>{imageUrl ? <img src={imageUrl} alt={alt} /> : <p>Loading...</p>}</div>
  );
};

export default ImageComponent;
