import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import SelectLang from '../select-lang'

function Head(props) {
  return (
    <div className='Head'>
      <div>
        <h1>{props.title}</h1>
      </div>
      {(props.selectLanguage ?
        <SelectLang onRu={props.onRu}
                    onEn={props.onEn}
                    onDe={props.onDe}
                    onCn={props.onCn}
                    label={props.label}
                    bauttonRu={props.bauttonRu}
                    bauttonEn={props.bauttonEn}
                    bauttonDe={props.bauttonDe}
                    bauttonCn={props.bauttonCn}/>
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
