import useSelector from "./use-selector";
import { index } from "../data/language";

export default function useTranslate(value) {

  const select = useSelector((state) => ({
    language: state.language.language,
  }));

  let text = "";
  index.filter((item) => {
    if (item.name == value) {
      text = item[select.language] || item['RU'];
    }
  });
  return text;
}
