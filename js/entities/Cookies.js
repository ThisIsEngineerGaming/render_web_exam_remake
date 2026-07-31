// sets a cookie with the given name, value, and lifetime in days
export function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// reads a cookie by name, returns an empty string if not found
export function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const [key, ...val] = v.split('=');
    return key === name ? decodeURIComponent(val.join('=')) : r;
  }, '');
}

// deletes the cookie by setting expire date into the past
export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
