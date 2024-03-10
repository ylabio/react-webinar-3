import { memo } from 'react';
import PropTypes from 'prop-types';
import { availableLanguages } from '../../language/translator';

function LanguageTool({setLanguage, currentLanguage, availableLanguages}) {

  const onChange = (evt) => {
    evt.preventDefault();
    setLanguage(evt.target.value);
  }


  return (
    <form onChange={onChange}>
      <select name='language' defaultValue={currentLanguage}>
        {
          availableLanguages.map((item, i) => {
            return (
              <option key={i} value={item.label}>{item.name}</option>
            )
          })
        }
      </select>
    </form>
  )
}

LanguageTool.propTypes = {
  setLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
  availableLanguages: PropTypes.array,
}

LanguageTool.defaultProps = {
  setLanguage: () => {},
  currentLanguage: availableLanguages[0].label
}

export default memo(LanguageTool);