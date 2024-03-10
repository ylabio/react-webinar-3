import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { PropTypes } from 'prop-types';
import { langData } from "../../store/language/langData";

function Loader({isLoading, language, children}) {
  const cn = bem('Loader');

  const translations = {
    loading: langData[language].service.loading
  }

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
  language: PropTypes.string
}

export default memo(Loader);