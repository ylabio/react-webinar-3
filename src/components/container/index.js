import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Container({justify, children}) {
  const cn = bem('Container');

  return (
    <div className={cn('', {[justify]: true})}>
      {children}
    </div>
  );
}

Container.propTypes = {
  justify: PropTypes.oneOf(['flexstart', 'flexend', 'spacebetween']),
};

Container.defaultProps = {
  justify: 'start'
}

export default memo(Container);
