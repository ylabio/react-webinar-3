import {memo, useCallback, useMemo, useEffect} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {

  const {translateService, locale} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru-RU', title: 'Русский'},
      {value: 'en-US', title: 'English'},
    ]), [])
  };

  const setLocale = (e) => {
    translateService.setLocale(e);
  }

  return (
    <Select onChange={setLocale} value={locale} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
