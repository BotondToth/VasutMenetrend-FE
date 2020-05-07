export const formatTime = (secs) => {
    const mins = secs / 60;
    const sec = secs % 60;

    return `${mins < 10 ? "0" + mins : mins}:${sec < 10 ? "0" + sec : sec}`;
}