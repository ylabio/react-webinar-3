import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import './style.css';

function Head({title}) {

  const store = useStore();

  const callbacks = {
    setLanguage: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-langs'>
        <a href="!#" onClick={(e) => {e.preventDefault(); callbacks.setLanguage('ru')}}>ru</a>
        <a href="!#" onClick={(e) => {e.preventDefault(); callbacks.setLanguage('en')}}>en</a>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
