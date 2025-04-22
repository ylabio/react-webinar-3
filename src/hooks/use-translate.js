import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context';

export default function useTranslate() {
  const services = useContext(ServicesContext);
  const { i18n } = services;
  const [lang, setL] = useState(i18n.lang);

  useEffect(() => i18n.subscribe(setL), [i18n]);

  return { lang, setLang: i18n.setLang, t: i18n.t };
}