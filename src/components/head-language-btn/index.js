import './style.css';
import Lang from '../../../public/icons/language.svg';

const LanguageBtn = ({ isDropdownVisible, languageState, onChangeLang, handleDropDownOpen }) => {
  const callbacks = {
    onChangeLang: (language) => onChangeLang(language),
    handleDropDownOpen: () => handleDropDownOpen(prev => !prev)
  }

  return (
    <div className="Head-language">
      <button className="Head-language-btn" onClick={callbacks.handleDropDownOpen}>
        <Lang className="icon"/>
        {languageState.languages[languageState.currentLanguage]}
      </button>
      {isDropdownVisible && (
        <ul className="Head-language-btn-dropdown">
          {Object.entries(languageState.languages).map((lang, i) => (
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
  );
};

export default LanguageBtn;