import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({textData, onChangeTextDataQuery}) {

  return (
    <div className='Head'>
      <h1>{textData.title}</h1>
      <select onChange={(e) => onChangeTextDataQuery(e.target.value)}>
        <option value='ru'>{textData.optionRu}</option>
        <option value='en'>{textData.optionEn}</option>
      </select>
    </div>
  )
}

Head.propTypes = {
  textData: PropTypes.exact({
    title: PropTypes.string,
    optionRu: PropTypes.string,
    optionEn: PropTypes.string,
  }).isRequired,
};

Head.defaultProps = {
  onChangeTextDataQuery: () => {},
}

export default memo(Head);
