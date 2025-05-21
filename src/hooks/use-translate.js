import { useEffect, useState } from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const i18n = useServices().i18n;
  const [, forceUpdate] = useState();

  useEffect(() => {
    return i18n.subscribe(() => forceUpdate({}));
  }, [i18n]);

  return {
    t: i18n.translate.bind(i18n),
    lang: i18n.currentLang,
    setLang: i18n.setLang.bind(i18n),
  };
}
