/**
 * DateFormat
 * Author: Rhys Wright
 * Description: Formats date to display full month name to increase consistency
 * Usage: Display date with full month name
 */

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