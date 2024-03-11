import { memo } from "react";
import PropTypes from "prop-types";

import useDictionary from "../../store/use-dictionary";

import "./style.css";

function Head({ title }) {
  const { setRuLng, setEngLng, currentLng } = useDictionary();

  const callbacks = {
    setRuLng: () => setRuLng(),
    setEngLng: () => setEngLng(),
  };

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Head-btn">
        <button
          className={currentLng === 'ru' ? 'Head-btn_active' : 'Head-btn_inactive'}
          onClick={callbacks.setRuLng}>
          RU
        </button>
        <button
          className={currentLng === 'eng' ? 'Head-btn_active' : 'Head-btn_inactive'}
          onClick={callbacks.setEngLng}>
          ENG
        </button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
