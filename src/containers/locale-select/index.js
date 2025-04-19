import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {
  const { lang, setLang, localeList, t } = useTranslate();

  return <Select onChange={setLang} value={lang} options={localeList} size="small" text />;
}

export default memo(LocaleSelect);
