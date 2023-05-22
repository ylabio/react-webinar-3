import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, modal, callback}) {
  return (
    <div className={'Head' + (modal ? ' modal' : '')}>
      <h1>{title}</h1>
      {modal && <button className="btn_modal_close" onClick={() => callback()}>Закрыть</button>}
    </div>
  )
};

Head.propTypes = {
  title: PropTypes.node,
  modal: PropTypes.bool,
  callback: PropTypes.func,
};

Head.defaultProps = {
  callback: () => {},
}

export default React.memo(Head);
