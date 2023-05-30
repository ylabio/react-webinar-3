import {memo} from "react";

function Translation({currentLang, onChangeLang}) {
  const handleOnchangeLang = (e) => {
    onChangeLang(e.target.value);
  }
  return (
    <form>
      <input
        type="radio"
        id="ruChoice"
        name="translation"
        value="ru"
        checked={currentLang === 'ru'}
        onChange={handleOnchangeLang}
      />
      <label htmlFor="ruChoice">Ru</label>

      <input
        type="radio"
        id="enChoice"
        name="translation"
        value="en"
        checked={currentLang === 'en'}
        onChange={handleOnchangeLang}
      />
      <label htmlFor="enChoice">En</label>
    </form>
  );
}

export default memo(Translation);
