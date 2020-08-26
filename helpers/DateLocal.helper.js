export default function DateLocal(date) {
    date = new Date(date);

    const offset = date.getTimezoneOffset() * 1000 * 60;

    return new Date(date.getTime() + offset);
}
