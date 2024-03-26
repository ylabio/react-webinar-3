

export default function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    let formattedDate = new Date(dateString).toLocaleString(undefined, options);
    formattedDate = formattedDate.replace(' г.', '');
    return formattedDate;
};
