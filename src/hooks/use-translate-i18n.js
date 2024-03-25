import {useCallback, useContext, useMemo, useState} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslateI18n() {

  const i18nServices = useServices().i18n;

//   const [lang, setLang] = useState('ru');
  
  // const lang = i18nServices.getLang();

  // const setLang = (lang) => i18nServices.setLang(lang);

  // const lang =  i18nServices.lang;
  const lang =  i18nServices.getLang();
  const setLang = (lang1) => {
    i18nServices.setLang(lang1)
  };
  const tr = (text, number) => i18nServices.translate(text, number);

  // const i18n = useMemo(() => ({
  // // const i18n = () => ({
  //   // Код локали
  //   lang: i18nServices.getLang(),
  //   // Функция для смены локали
  //   setLang: function (lang) { 
  //     i18nServices.setLang(lang);
  //   },
  //   // Функция для локализации текстов с замыканием на код языка
  //   tr: (text, number) => i18nServices.translate(text, number)
  // }), [i18nServices.lang]);

  i18nServices.subscribe((value) => {
    setLang(value);
  })
  // });

  return (
    // i18n
    {lang, setLang, tr}
  );

}