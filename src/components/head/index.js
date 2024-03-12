import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import './style.css';
import Lang from '../../../public/icons/language.svg'
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function Head({title}) {

  const store = useStore()

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const select = useSelector(state => ({
    currentLanguage: state.language.languages[state.language.currentLanguage],
    languages: state.language.languages
  }))

  const callbacks = {
    onChangeLang: useCallback((language) => {
      store.actions.language.setLanguage(language)
    }, [store]),
    handleDropDownOpen: () => setIsDropdownVisible(prev => !prev)
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Head-language">
        <button className="Head-language-btn" onClick={callbacks.handleDropDownOpen}>
          <Lang className="icon"/>
          {select.currentLanguage}
        </button>
        {isDropdownVisible && (
          <ul className="Head-language-btn-dropdown">
            {Object.entries(select.languages).map((lang, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    callbacks.handleDropDownOpen()
                    callbacks.onChangeLang(lang[0])
                  }}
                  className="Head-language-btn-dropdown-item">{lang[1]}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
