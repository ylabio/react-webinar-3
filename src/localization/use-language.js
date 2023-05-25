import useSelector from "../store/use-selector";
import useStore from "../store/use-store";

export default function useLanguage() {

  const store = useStore();
  const funcRef = word => store.actions.localization.localizeText(word);
  
  useSelector(state => state.localization.lang);

  return funcRef;
}