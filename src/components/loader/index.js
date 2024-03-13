import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { PropTypes } from 'prop-types';

function Loader({isLoading, translations, children}) {
  const cn = bem('Loader');

  if (isLoading) {
    return (
      <div className={cn()}>
        <div className={cn('text')}>{translations.loading}</div>
      </div>
    )
  } else {
    return (
      children
    )
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  translations: PropTypes.object
}

export default memo(Loader);