import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Controls from "../controls";
import "./style.css";

/**
 *  Функция для создания модального окна
 * @param {Object} props - объект пропсов
 * @param {Object} props.title - Надпись в шапке
 * @param {Function} props.onModalOverlayClick - Функция, срабатает при клике на оверлей модального окна
 * @param {Node} props.children - разметка которую стоит поместить внутрь компонента
 * @returns разметка
 */
function Modal({ title, onModalOverlayClick, children }) {

  /**
   * функция которая сработает при клике на кнопку закрыть или фон модалки
   * @event {*} e - событие
   */
  const onCloseModalClick = (e) => {
    e.stopPropagation();
    onModalOverlayClick();
  };

  return (
    <div className="Modal">
      <div className="Modal-overlay" onClick={onCloseModalClick} />
      <div className="Modal-content">
        <Head title={title}>
          <Controls title="Закрыть" onToggleCart={onCloseModalClick} />
        </Head>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onModalOverlayClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(Modal);
