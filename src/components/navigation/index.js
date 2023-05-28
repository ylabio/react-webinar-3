import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

function Navigation(props) {

  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={`/`} className={cn('navigation')}>{props.getTranslation('HOME', props.language)}</Link>      
    </div>
  );
}

Navigation.propTypes = { 
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

Navigation.defaultProps = { 
  getTranslation: () => {},
}

export default memo(Navigation);
