import React from "react";
import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
  disabled: boolean;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled }) => {
  return (
    <div className={s.buttonBox}>
      <button
        className={s.button}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
