const setCookie = (name: string, value: string, exp: number, path?: string, domain?: string) => {
  const date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); // 일
  let cookieText = name + "=" + value;
  cookieText += exp ? `; EXPIRES=${date.toUTCString()}` : "";
  cookieText += path ? "; PATH=" + path : "; PATH=/";
  cookieText += domain ? "; DOMAIN=" + domain : "";
  document.cookie = cookieText;
};

const getCookie = (name: string) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export { setCookie, getCookie, deleteCookie };
