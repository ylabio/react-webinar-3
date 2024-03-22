export default function formatDate(currentDate){
    const date = new Date(currentDate)
    const formatted = date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      return formatted.replace("г. ", "")
}