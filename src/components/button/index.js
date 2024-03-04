import React from "react";
import PropTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './style.css';

function Button(props) {

  const titles = {
    'onAdd': 'Добавить',
    'onDel': 'Удалить',
    'onIncr': 'Увеличить',
    'onDecr': 'Уменьшить',
    'onClose': 'Закрыть',
    'onOpen': 'Открыть',
    'onShow': 'Показать',
    'onHide': 'Скрыть',
  }

  const callbackName = Object.keys(props).find(s => s.startsWith('on'));
  const callback = props[callbackName];
  const title = props.title || titles[callbackName];
  const className = cn('Button')(null, [props.className]);

  return (
    <button onClick={callback} className={className}>
      {title}
    </button>
  );
}

Button.propTypes = {
  onAdd:PropTypes.func,
  onDel:PropTypes.func,
  onIncr:PropTypes.func,
  onDecr:PropTypes.func,
  onClose:PropTypes.func,
  onOpen:PropTypes.func,
  onShow:PropTypes.func,
  onHide:PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Button);