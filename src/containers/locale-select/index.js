import {memo, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

/**
 * Контейнер для смены языка
 */
function LocaleSelect() {

  const {lang, setLang} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select width={88} onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
