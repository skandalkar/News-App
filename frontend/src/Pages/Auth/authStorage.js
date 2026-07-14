const AUTH_USER_KEY = "briefly_auth_user";
const PENDING_AUTH_KEY = "briefly_pending_auth";
const AUTH_TOKEN_KEY = "token";

export const getAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY));
  } catch {
    return null;
  }
};

export const saveAuthUser = (user) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  if (user?.token) {
    localStorage.setItem(AUTH_TOKEN_KEY, user.token);
  }
  window.dispatchEvent(new Event("briefly-auth-change"));
};

export const clearAuthUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new Event("briefly-auth-change"));
};

export const getPendingAuth = () => {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_AUTH_KEY));
  } catch {
    return null;
  }
};

export const savePendingAuth = (payload) => {
  sessionStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(payload));
};

export const clearPendingAuth = () => {
  sessionStorage.removeItem(PENDING_AUTH_KEY);
};