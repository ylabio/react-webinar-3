import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import './style.css';

function LinkUI (props) {

  const cn = bem('LinkUI');

  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={props.link} state={{back: location.pathname}}>{props.text}</Link>
    </div>
  );

}

LinkUI.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
};

export default memo(LinkUI);