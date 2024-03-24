import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TextArea(props) {

  return (
    <div className={'TextArea'}>
      <b>{props.label}</b>
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}></textarea>
      {props.children}
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  placeholder: PropTypes.string
};

TextArea.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  placeholder: '',
}

export default memo(TextArea);
