import {memo, useCallback, useMemo} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import { useState } from 'react';

function LocaleSelect() {

  const {locale, setLocale} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={setLocale} value={locale} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
