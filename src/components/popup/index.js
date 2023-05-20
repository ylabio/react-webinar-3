import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import Head from "../head";
import ModalLayout from "../layouts/modal-layout";
import './style.css';

/** Пустое окно с названием и кнопкой. Можно использовать не только для корзины */

function Popup({ title, children, setActive }) {
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
    fixPopupSize(); // fix: забыл отловить изменения чилдов, если там чтото поменялось
  }, [children]);

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
    <div className={cn()} onClick={() => setActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <ModalLayout>
          <Head title={title} />
          <button className={cn('close')} onClick={() => setActive(false)}>Закрыть</button>
          <div className={cn('inner_content')}>
            {children}
          </div>
        </ModalLayout>
      </div>
    </div>
  );
};

Popup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  setActive: PropTypes.func.isRequired,
}

Popup.defaultProps = {
  title: "ModalWindow",
  setActive: () => { }
}

export default React.memo(Popup);