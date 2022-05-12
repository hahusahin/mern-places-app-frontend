import { useState, useEffect, useCallback } from "react";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    // if exists, get the existing expiration time of the token
    // if not exists, create a date which is 1 hour later to now
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 3600 * 1000);
    setTokenExpDate(tokenExpirationDate);
    // save the info into Local Storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpDate(null);
    // delete the token from localstorage
    localStorage.removeItem("userData");
  }, []);

  // set a timer for expiration duration
  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  // check for authentication when browser reloads
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData && // is localstorage has userData in it
      storedData.token && // is data includes token
      new Date(storedData.expiration) > new Date() // is still valid (not expired)
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
