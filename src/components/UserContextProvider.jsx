import { createContext, useCallback, useEffect, useState } from "react";

import API from "../utils/API";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem("userId");
    if (id) {
      API.getUserByParams({ id })
        .then((user) => setUser(user))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
    }
  }, [user?.id]);

  const logOut = useCallback(() => {
    localStorage.removeItem("userId");
    window.location.replace("/login");
  }, []);

  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
