import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import './style.css';

/** Пустое окно с названием и кнопкой. Можно использовать не только для корзины */

function Popup(props) {
  const cn = bem('Popup');

  // Костыль для ситуаций с мелкими экранами или ресайзами.
  const fixPopupSize = () => {
    const popup = document.getElementsByClassName('Popup')[0].classList;
    const popupContent = document.getElementsByClassName('Popup-content')[0].classList;
    if (document.getElementsByClassName('Popup-content')[0].offsetHeight > window.innerHeight - 20) {
      popup.add('Popup-overfilled');
      popupContent.add('Popup-content-overfilled');
    } else {
      popup.remove('Popup-overfilled');
      popupContent.remove('Popup-content-overfilled');
    }
  }

  useEffect(() => {
    fixPopupSize();
    window.addEventListener('resize', fixPopupSize);
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
      window.removeEventListener('resize', fixPopupSize);
    }
  }, []);

  return (
    <div className={cn()} onClick={() => props.setActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <button className={cn('close')} onClick={() => props.setActive(false)}>Закрыть</button>
        {props.children}
      </div>
    </div>
  );
};

Popup.propTypes = {
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node,
}

Popup.defaultProps = {
  setActive: () => { }
}

export default React.memo(Popup);