export const secondsToTime = ( value ) => {
    if(!value) return;
    const date = new Date(null);
    date.setSeconds(value);
    return date.toISOString().substr(11, 8);
};