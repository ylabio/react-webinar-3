import { memo, useCallback, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  // const { lang, setLang } = useTranslate();
  // console.log('Что показываешь в useTranslate', useTranslate());
  // const [lang, setLang] = useState('ru');
  const { locale, setLocale } = useTranslate();
  // const { locale, t } = useTranslate();
  console.log('LocaleSelect locale', locale);
  
  // const handleChange = (lang) => {
  //   changeLocale(lang);
  //   setLang(lang);
  // };

  

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  // return <Select onChange={handleChange} value={locale} options={options.lang} size="small" text />;
  return <Select onChange={setLocale} value={locale} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
