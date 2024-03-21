import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Label(props) {
  return (
    <label htmlFor={props.id}>{props.title}</label>
  )
}

Label.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string
}

export default memo(Label);