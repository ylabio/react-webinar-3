import {useCallback} from 'react';
import useSelector from '../store/use-selector';

export const ObjectWords = {
  en: {
    shop: 'Shop',
  },
  ru: {
    shop: 'Магазин',
  },
};

export function useTranslate() {
  const select = useSelector((state) => ({
    lang: state.language.lang,
  }));

  return useCallback(
    (str) => {
      return ObjectWords[select.lang][str] || null;
    },
    [select.lang]
  );
}
