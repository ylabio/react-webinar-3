import { useCallback } from 'react';
import useSelector from '../store/use-selector';
import translations from '../utils/lang';

export default function useTranslate() {
  const currentLang = useSelector(state => state.lang.currentLang);

  const t = useCallback(key => translations[currentLang][key] || key, [currentLang]);

  return { t, currentLang };
}
