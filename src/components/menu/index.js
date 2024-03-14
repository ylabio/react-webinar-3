import {memo} from "react";
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Menu({link}) {
  const cn = bem('Menu');

  const {page} = useParams();

  return (
    <div className={cn('list')}>
      <Link to={`/${page}`} className={cn('link')}>{link}</Link>
    </div>
  )
}

Menu.propTypes = {
  link: PropTypes.string
};

export default memo(Menu);