import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { PropTypes } from 'prop-types';
import { langData } from "../../store/language/langData";

function Error({isError, language, children}) {
  const cn = bem('Error');

  const translations = {
    error: langData[language].service.error
  }

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
  language: PropTypes.string
}

export default memo(Error);