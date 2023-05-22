import PropTypes from "prop-types";
import './style.css';
import {memo} from "react";

function Head({cartSum}){
  return (
    <div className='Total-sum'>
      Итого: <div className='Total-sum-num'>{cartSum.toLocaleString('ru-RU')} <span> ₽</span></div>
    </div>
  )
}

Head.propTypes = {
  cartSum: PropTypes.number,
};

export default memo(Head);
