import useSelector from "../store/use-selector";
import translation from "../translation.json";

export default function useTranslation() {
  const { lang } = useSelector((state) => ({
    lang: state.language.language,
  }));

  const getTranslation = (word) => translation[word][lang];

  return [getTranslation];
}
