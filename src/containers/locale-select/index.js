import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import CustomSelect from '../../components/custom-select';

/**
 * Контейнер для смены языка
 */
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

  return <CustomSelect onChange={setLang} value={lang} options={options.lang} size="small" text />;
}

export default memo(LocaleSelect);
