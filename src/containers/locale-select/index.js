import { memo, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const { locale, setLocale } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={setLocale} value={locale} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
