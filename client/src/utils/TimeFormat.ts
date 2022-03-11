const timeFormat = (t: string) => {
    const time = t.split(':');

    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    
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