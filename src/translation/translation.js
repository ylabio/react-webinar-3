import { dataLanguage } from "./dataLanguage";

export default function translate(lang) {
  return dataLanguage[lang]
}