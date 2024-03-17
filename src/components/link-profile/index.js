import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function LinkProfile (props) {

  const cn = bem('LinkProfile');

  return (
    <div className={cn('action')}>
      <Link className={cn('link')} to={props.link}>{props.name}</Link>
    </div>
  );
}

LinkProfile.PropTypes = {
  link: PropTypes.string,
  name: PropTypes.string
}

export default memo(LinkProfile);