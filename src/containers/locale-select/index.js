import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const { lang, setLang } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  const onChange = useCallback((value) => {
    setLang(value);
  }, [setLang]);

  return <Select onChange={onChange} value={lang} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
