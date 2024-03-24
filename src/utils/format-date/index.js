export default function formatDate(currentDate, lang){
    const date = new Date(currentDate);
    const local = lang === "ru" ? "ru-RU" : "en-EN"
    const formatted = date.toLocaleDateString(local, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      return formatted.replace("г. ", "")
}