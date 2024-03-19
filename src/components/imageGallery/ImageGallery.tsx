import React from "react";
import { imageGalleryImages } from "../../constants/constants";
import "./ImageGallery.css";

interface Image {
  src: string;
  caption: string;
}

const ImageGallery: React.FC = () => {
  return (
    <div className="image-gallery">
      {imageGalleryImages.map((image: Image, index: number) => (
        <div key={image.caption} className="image-item">
          <img
            src={image.src}
            alt={`Image ${index + 1}`}
            className="image-gallery-image"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
