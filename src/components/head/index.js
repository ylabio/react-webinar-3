import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {
  return (
    <div className='Head'>
      <div>
        <h1>{props.title}</h1>
      </div>
      {(props.selectLanguage ?
      <div className='SelectLanguage'>
        <div className='SelectLanguage-label'>
          {props.label}:
        </div>
        <div className='SelectLanguage-buttons'>
          <div className='SelectLanguage-button'>
          <button className='Button-SelectLanguage' onClick={props.onRu}>
            {props.bauttonRu}
          </button>
          </div>
          <div className='SelectLanguage-button'>
          <button className='Button-SelectLanguage' onClick={props.onEn}>
            {props.bauttonEn}
          </button>
          </div>
          <div className='SelectLanguage-button'>
          <button className='Button-SelectLanguage' onClick={props.onDe}>
            {props.bauttonDe}
          </button>
          </div>
          <div className='SelectLanguage-button'>
          <button className='Button-SelectLanguage' onClick={props.onCn}>
            {props.bauttonCn}
          </button>
          </div>
        </div>
      </div>
      : '')}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  selectLanguage: PropTypes.bool,
  onRu: PropTypes.func,
  onEn: PropTypes.func,
  onDe: PropTypes.func,
  onCn: PropTypes.func,
  label: PropTypes.string,
  bauttonRu: PropTypes.string,
  bauttonEn: PropTypes.string,
  bauttonDe: PropTypes.string,
  bauttonCn: PropTypes.string,
};

Head.defaultProps = {
  selectLanguage: false,
  onRu: () => {},
  onEn: () => {},
  onDe: () => {},
  onCn: () => {},
}

export default memo(Head);
