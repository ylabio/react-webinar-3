import { memo } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function NavMenu({navList}) {
  const cn = bem('NavMenu');
  return (
      <ul className={cn()}>
        {
            navList.map(({title, link}) => {
                return (
                    <li key={title}>
                        <Link className={cn("main")} to={link}>{title}</Link>
                    </li>
                )
            })
        }
      </ul>
  );
}

NavMenu.propTypes = {
    navList: PropTypes.array
};

NavMenu.defaultProps = {
    navList: []
}

export default memo(NavMenu)
