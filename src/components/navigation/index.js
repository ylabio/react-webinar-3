import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import PropTypes from 'prop-types';

import { PAGE_PATH } from '../../constants';

import './style.css';

function Navigation(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const location = useLocation();

  const checkLocation = () => {
    const { pathname } = location;
    if (pathname !== PAGE_PATH.MAIN_PAGE) {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  return (
    <nav className="Navigation">
      <Link to={PAGE_PATH.MAIN_PAGE} className={isDisabled ? `Navigation-link disabled` : 'Navigation-link'}>
        {props.title}
      </Link>
    </nav>
  );
}

Navigation.propTypes = {
  title: PropTypes.string,
};
export default Navigation;
