import {memo, useMemo, useState} from 'react';
import useStore from '../../hooks/use-store';
import useStoreTranslate from '../../hooks/use-store-translate';
import Select from '../../components/select';
import {useSelectorTranslate} from '../../hooks/use-selector-translate';

function LocaleSelect() {

  const select = useSelectorTranslate(state => ({
    language: state.translate.language
  }));

  const [lang, setLang] = useState(select.language);
  const store = useStore();
  const storeTranslate = useStoreTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={(lang) => {
      setLang(lang);
      store.services.api.setHeader('X-Lang', lang);
      storeTranslate.actions.translate.changeLanguage(lang);
    }} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
