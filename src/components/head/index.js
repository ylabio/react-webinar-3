import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, setActive}) {

  const cn = bem('Head')

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {setActive &&
      <button className={cn('button')} onClick={() => setActive(false)}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  setActive: PropTypes.func,
};

export default React.memo(Head);
