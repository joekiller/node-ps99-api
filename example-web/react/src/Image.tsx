import React, { useEffect, useState } from "react";
import { PetSimulator99API } from "ps99-api";

interface ImageProps {
  rbxassetid: string;
}

const ImageComponent: React.FC<ImageProps> = ({ rbxassetid }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const api = new PetSimulator99API();
        const imageBlob = await api.getImage(rbxassetid);
        const imageUrl = URL.createObjectURL(
          new Blob([imageBlob], { type: "image/png" }),
        );
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();

    // Cleanup URL object on component unmount
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [rbxassetid, imageUrl]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched Image" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageComponent;
