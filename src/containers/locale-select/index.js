import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {

  const {lang, setLang} = useTranslate(); 

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
