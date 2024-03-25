import {memo, useCallback, useMemo} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useTranslateI18n from '../../hooks/use-translate-i18n';
import Select from '../../components/select';

function LocaleSelect() {

  const {lang, setLang} = useTranslate();
  // const {setLang} = useTranslate();

  // const {lang, setLang} = useTranslateI18n(); 
  

  console.log("useTranslateI18n() lang:", lang);

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
