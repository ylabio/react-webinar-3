import {memo, useCallback} from 'react';
import useStore from '../../store/use-store';
import PropTypes from 'prop-types';
import './style.css';

function LangSelect() {

  const store = useStore();

  const callbacks = {
    onLangChange: useCallback((newLang) => store.actions.lang.changeLang(newLang), [store])
  }

  return (
    <div className='Lang'>
      <select className='Lang-select' onChange={ e => callbacks.onLangChange(e.target.value)}>
        <option value='en' label='English'>English language</option>
        <option value='ge' label='ქართული'>ქართული ენა</option>
        <option value='ru' label='Русский'>Русский язык</option>
      </select>
    </div>
  )
}

LangSelect.propTypes = {
  title: PropTypes.node,
};

export default memo(LangSelect);
