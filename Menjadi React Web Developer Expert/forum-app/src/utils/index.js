function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffYears > 0) {
    return `${diffYears} years ago`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} months ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hours ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

export { postedAt };
