export const setToLocalStorage = (key: string, value: any) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  let data = localStorage.getItem(key);
  return data;
};
