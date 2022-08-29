let timeoutId;
export function debounce(func, delay) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    func();
  }, delay || 400);
}