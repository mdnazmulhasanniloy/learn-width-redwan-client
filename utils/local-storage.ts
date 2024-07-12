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
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  let data = localStorage.removeItem(key);
  return data;
};
