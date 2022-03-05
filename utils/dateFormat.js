module.exports = (timestamp) => {
    let months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    // gets timestamp for the date
    const dateObj = new Date(timestamp);

    // gets the month, day, year
    const theMonth = months[dateObj.getMonth()];
    let theDay = dateObj.getDate();
    let theYear = dateObj.getFullYear();

    let hour;
    // check for 24hr time
    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } 
    else {
        hour = dateObj.getHours();
    }
    // if hour is 0, change it to 12
    if (hour === 0) {
        hour = 12;
    }

    // gets the minutes
    const minutes = dateObj.getMinutes();

    // finds if it's AM or PM
    let timeOfDay;
    if(dateObj.getHours() >= 12){
        timeOfDay = 'PM';
    }
    else{
        timeOfDay = 'AM';
    }

    // puts all the date together and returns it
    const formattedDate = `${theDay} ${theMonth} ${theYear} at ${hour}:${minutes} ${timeOfDay}`;
    return formattedDate;
}