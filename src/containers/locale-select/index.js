import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import useServices from '../../hooks/use-services';

function LocaleSelect() {
  const { I18n } = useServices();

  const handleLanguageChange = (newLang) => {
    I18n.setLang(newLang);
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

  return <Select onChange={handleLanguageChange} value={options.lang.value} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
