import useTranslate from "../hooks/use-translate";

export default function formatDate(date) {
  const { currentLanguage } = useTranslate();
  return new Date(date)
    .toLocaleString(currentLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(/\s*г\./, "");
}
