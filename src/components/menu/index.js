import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';
import {localization} from '../../localization';

function Menu(props) {

  const cn = bem('Menu');

  return (
    <>
      <Link className={cn('link')} to={'/'}>{localization.link.mainPage[props.language]}</Link>
    </>
  )
}

Menu.propTypes = {
  localization: PropTypes.object,
  language: PropTypes.string,
}

export default memo(Menu);