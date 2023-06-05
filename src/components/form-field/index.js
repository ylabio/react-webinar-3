import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import {memo} from "react";
import './style.css';

function FormField(props) {
  const cn = bem('FormField');

  return (
    <div className={cn()}>
      <div className={cn('label')}>{props.label}</div>
      <div className={cn('input')}>
        {props.renderInput()}
      </div>
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string,
  renderInput: PropTypes.func,
  error: PropTypes.node,
}

export default memo(FormField);