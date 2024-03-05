import React from "react";
import PropTypes from "prop-types";
import Button from '../ui/button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head({title, onCloseModal, inCart}) {

  const cn = bem('Head');

  return (
    <div className={`${cn()} ${inCart ? cn('-cart') : ''}`}>
      <h1>{title}</h1>
      {inCart && <Button onClick={onCloseModal} inCart={true}>Закрыть</Button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  inCart: PropTypes.bool
};

Head.defaultProps = {
  onCloseModal: () => {}
}

export default React.memo(Head);
