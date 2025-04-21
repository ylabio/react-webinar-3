import { memo, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const { locale, setLocale, getAvailableLocales } = useTranslate();

  const options = useMemo(() => getAvailableLocales(), [getAvailableLocales]);

  return <Select onChange={setLocale} value={locale} options={options} size="small" text />;
}

export default memo(LocaleSelect);
