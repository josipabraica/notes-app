export function getStateFromStorage<T>(key: string) {
  try {
    const stringifiedState = localStorage.getItem(key);

    if (stringifiedState === null) {
      return null;
    }

    const parsedState: T = JSON.parse(stringifiedState);
    return parsedState;
  } catch (error) {
    return null;
  }
}

export function setStateToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
}
