import React, { useEffect, useState } from "react";
import { PetSimulator99API } from "ps99-api";

interface ImageProps {
  src: string;
  alt: string;
}

const imageCache = new Map<string, string>();

const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (imageCache.has(src)) {
        setImageUrl(imageCache.get(src)!);
      } else {
        try {
          const api = new PetSimulator99API();
          const response = await api.getImage(src);
          const imageBlob = new Blob([response], { type: "image/png" });
          const imageUrl = URL.createObjectURL(imageBlob);
          imageCache.set(src, imageUrl);
          setImageUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();

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
