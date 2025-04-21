import {useCallback, useContext, useMemo, useState, useEffect} from 'react';
import { I18nContext } from '../i18n/context';
import translate from '../i18n/translate';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n;

  const [langState, setLangState] = useState(i18nService.getLang());

  useEffect(() => {
    return i18nService.subscribe(setLangState);
  }, [i18nService]);

  const i18n = useMemo(
    () => ({
      // Код локали
      lang: langState,
      // Функция для смены локали
      setLang: (lang) => {
        i18nService.setLang(lang);
      },
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => translate(langState, text, number),
    }),
    [langState, i18nService],
  );

  return i18n;
}
