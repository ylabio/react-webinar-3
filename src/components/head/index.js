import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ButtonsLang from "../buttons-lang";

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>

        <ButtonsLang/>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
