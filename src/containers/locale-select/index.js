import { memo, useMemo, useState, useEffect } from 'react';
import Select from '../../components/select';
import useLocale from '../../hooks/use-locale';

function LocaleSelect() {
  const { locale, setLocale } = useLocale()
  const [currentValue, setCurrentValue] = useState('ru')

  useEffect(() => {
    setCurrentValue(locale)
  }, [locale]);

  function toggleLanguage(value) {
    setLocale(value);
    setCurrentValue(locale)
  }

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={toggleLanguage} value={currentValue} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
