import { useEffect } from "react";

export default function useModalClose(modalIsOpened, closeModal, modalOpenClassName) {
  useEffect(() => {
    if (!modalIsOpened) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains(modalOpenClassName)) {
        closeModal();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [modalIsOpened, closeModal]);
}