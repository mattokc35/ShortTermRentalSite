import React from "react";
import { imageGalleryImages } from "../../constants/constants";
import "./ImageGallery.css";

//this component is for the 8 first favorited images to be displayed prominently
const ImageGallery = () => {
  return (
    <div className="image-gallery">
      {imageGalleryImages.map((image, index) => (
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
