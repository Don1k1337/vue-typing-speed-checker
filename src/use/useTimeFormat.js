export const useTimeFormat = (time, duration) => {
    const minutes = Math.floor(time / duration);
    const seconds = time % duration;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};