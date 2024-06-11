import React, { FC } from "react";
import { Image } from "cloudinary-react";

interface CloudinaryImageProps {
  publicId: string | undefined;
  style?: React.CSSProperties; // Add style prop
}

const CloudinaryImage: FC<CloudinaryImageProps> = ({ publicId, style }) => {
  return (
    <Image
      cloudName={process.env.CLOUDINARY_CLOUD_NAME}
      publicId={publicId}
      style={style}
    />
  );
};

export default CloudinaryImage;
