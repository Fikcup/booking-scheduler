/**
 * TypeFormat
 * Author: Rhys Wright
 * Description: Capitalize first letter of every word in a string
 * Usage: Formats booking type to have capital starting letters
 */

const typeFormat = (type: string) => {
    const words = type.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return words.join(' ');
}

export default typeFormat;