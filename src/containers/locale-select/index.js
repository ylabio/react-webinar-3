import {memo, useCallback, useMemo, useState} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import useServices from '../../hooks/use-services';

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
