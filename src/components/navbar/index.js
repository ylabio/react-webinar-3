import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Navbar (props) {

  const cn = bem('Navbar');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  );

}

Navbar.PropTypes = {
  children: PropTypes.node
}

export default memo(Navbar);