import {memo} from "react";
import PropTypes from "prop-types";
import { useLanguage } from '../../language-context';
import './style.css';

function Head({ title }) {
  const { translate, changeLanguage } = useLanguage();

  return (
    <div className='Head'>
      <h1 className='Head-title'>{title}</h1>
      <button className='Head-btn' onClick={() => changeLanguage()}>
        {translate('Сменить язык')}
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
