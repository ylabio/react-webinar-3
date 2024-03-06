import React from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Компонент оверлея модального окна
 * @param {Object} props - объект пропсов
 * @param {Function} props.onModalOverlayClick - Функция, срабатает при клике на оверлей модального окна
 * @returns Разметка
 */
function ModalOverlay({onModalOverlayClick}) {
  return <div className="ModalOverlay" onClick={onModalOverlayClick}></div>;
};

ModalOverlay.propTypes = {
  onModalOverlayClick: PropTypes.func,
};

ModalOverlay.defaultProps = {
  onModalOverlayClick: () => {},
};

export default React.memo(ModalOverlay);
