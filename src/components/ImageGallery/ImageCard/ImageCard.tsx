import { useState } from "react";
import s from "./ImageCard.module.css";
import { ImageData } from "../../App/App.types";

type ImageCardProps = {
  card: ImageData;
  onImageClick: (card: ImageData) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ card, onImageClick }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className={s.imageBox}>
      {!loaded && <div className={s.skeleton}></div>}
      <img
        className={`${s.image} ${loaded ? s.loaded : ""}`}
        src={card.urls.small}
        alt={card.alt_description || "Image"}
        onClick={() => onImageClick(card)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageCard;
