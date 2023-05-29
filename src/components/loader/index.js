import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Loader({loading, children}) {
  const cn = bem('Loader');

  if (loading) {
    return (
      <div className={cn()}>
        <h1 className={cn('text')}>Loading...</h1>
      </div>
    );
  }

  return <>{children}</>
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default memo(Loader);
