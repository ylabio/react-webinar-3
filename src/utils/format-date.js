export default function formatDate(stringDate) {
    const date = new Date(stringDate);
    const year = date.getFullYear();
    const day =  date.toLocaleString("ru", {
        month: "long",
        day: "numeric",
      });

    const time = [date.getHours(), date.getMinutes()].map(function (x) {
        return x < 10 ? "0" + x : x
      }).join(":")

    return `${day} ${year} в ${time}`
  }
  