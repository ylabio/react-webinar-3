import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { PropTypes } from 'prop-types';

function Error({isError, translations, children}) {
  const cn = bem('Error');

  if (isError) {
    return (
      <div className='Error'>
        <p className={cn('text')}>{translations.error}</p>
      </div>
    )
  } else {
    return (
      children
    )
  }
}

Error.propTypes = {
  isError: PropTypes.bool,
  children: PropTypes.node,
  translations: PropTypes.object
}

export default memo(Error);