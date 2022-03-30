/**
 * DateTimeFormat
 * Author: Rhys Wright
 * Description: Takes date and time strings and converts them to the user's timezone
 * Usage: Format date and times to account for timezone and improve readability of the timestamp
 */

import { format } from 'date-fns';

const dateTimeFormat = (date: string, t: string) => {
    // console.log(date);
    const timeArr = t.split(':');
    const dateArr = date.split('-');
    console.log(dateArr[0], dateArr[1], dateArr[2]);
    const dateTime = new Date(Date.UTC(parseInt(dateArr[0]), parseInt(dateArr[1]), parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]), 0, 0));
    console.log(dateTime);

    const time = format(dateTime, 'PPPp');
    console.log(time);
    return time;
}

export default dateTimeFormat;