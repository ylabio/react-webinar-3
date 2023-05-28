import useSelector from '../store/use-selector';
import useStore from '../store/use-store';

export default function useTranslate() {

  const store = useStore();
  const translate = keyword => store.actions.language.translate(keyword);
  useSelector(state => state.language.code);
  
  return translate;
}