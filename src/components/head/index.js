import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, setModal}){
  return (
    <div className="Head">
      <h1>{title}</h1>
      {setModal && <button onClick={() => setModal(false)}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  setModal: PropTypes.func
};

export default React.memo(Head);
