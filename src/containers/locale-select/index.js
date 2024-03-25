import {memo, useCallback, useMemo, useState} from 'react';
import useStore from '../../hooks/use-store';
import Select from '../../components/select';
import translateActions from '../../store-redux/translate/actions';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';

function LocaleSelect() {

  const select = useSelector(state => ({
    language: state.translate.language
  }), shallowequal);

  const [lang, setLang] = useState(select.language);
  const store = useStore();

  const dispatch = useDispatch();

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
      dispatch(translateActions.changLanguage(lang));
    }} value={lang} options={options.lang}/>
  );
}

export default memo(LocaleSelect);
