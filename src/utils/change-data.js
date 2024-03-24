export default function changeDate(date) {
  return new Date(date)
    .toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(/\s*г\./, "");
}
