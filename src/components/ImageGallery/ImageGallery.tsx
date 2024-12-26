import React from "react";
import ImageCard from "./ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { ImageData } from "../App/App.types";

type ImageGalleryProps = {
  images: ImageData[];
  onImageClick: (card: ImageData) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={s.gallery}>
      {images.map((card) => (
        <li className={s.item} key={card.id}>
          <ImageCard card={card} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
