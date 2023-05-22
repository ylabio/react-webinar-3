import PropTypes from "prop-types";
import {useCallback, useEffect} from "react";

export function useModal({ isOpen, onClose }) {

  const closeHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      closeHandler();
    }
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeHandler])

  return { closeHandler }
}

useModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}