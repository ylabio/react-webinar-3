import translation from "../translation.json";

export default function useTranslation(language) {
  const getTranslation = (word) => translation[word][language];

  return [getTranslation];
}
