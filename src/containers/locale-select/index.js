import { memo, useMemo } from 'react';
import Select from '../../components/select';
import useTranslate from '../../hooks/use-translate';

function LocaleSelect() {
  const { locale, setLocale } = useTranslate();

  const options = {
    locale: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <Select onChange={setLocale} value={locale} options={options.locale} size="small" text />;
}

export default memo(LocaleSelect);
