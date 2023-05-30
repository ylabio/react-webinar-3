import useLang from "../../i18n/use-lang";

function LangSwitcher() {
  const { changeLanguage, lang } = useLang();

  function onChange({ target }) {
    changeLanguage(target.value);
  }

  return (
    <select onChange={onChange} value={lang}>
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
  );
}

export default LangSwitcher;
