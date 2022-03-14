import { parseISO } from 'date-fns';

const dateFormat = (date: string) => {
    const format = parseISO(date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return format;
}

export default dateFormat;