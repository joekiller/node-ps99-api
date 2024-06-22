import React, { useEffect, useState, useRef } from 'react';
import { PetSimulator99API } from 'ps99-api';

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
          const imageBlob = await api.getImage(src);
          const imageUrl = URL.createObjectURL(new Blob([imageBlob], { type: 'image/png' }));
          imageCache.set(src, imageUrl);
          setImageUrl(imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
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
    <div>
      {imageUrl ? <img src={imageUrl} alt={alt} /> : <p>Loading...</p>}
    </div>
  );
};

export default ImageComponent;
