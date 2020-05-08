export const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);

    return `${mins < 10 ? "0" + mins : mins}:${sec < 10 ? "0" + sec : sec}`;
}