import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Menu({children}) {

  const cn = bem('Menu');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

Menu.propTypes = {

};

Menu.defaultProps = {
  onOpen: () => {},
}

export default memo(Menu);
