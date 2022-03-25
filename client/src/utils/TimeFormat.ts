/**
 * TimeFormat
 * Author: Rhys Wright
 * Description: Takes a date object, accounts for timezone offset, and formats the date to be 4:00 PM or similar
 * Usage: Format dates to account for timezone and improve readability of the timestamp
 */

const timeFormat = (t: string) => {
    const time = t.split(':');
    let offset = new Date().getTimezoneOffset();
    let totalMinutes = parseInt(time[0]) * 60 + parseInt(time[1]) - offset;

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    
    let timeValue;
    
    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
     
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M." : " A.M.";

    return timeValue;
}

export default timeFormat;