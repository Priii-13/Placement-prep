import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser, setUser as storeUser, getToken, setToken } from "@/lib/storage";









const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          const data = await res.json();
          if (data.success && data.data) {
            const u = { id: data.data._id, email: data.data.email, name: data.data.name };
            storeUser(u);
            setUserState(u);
          } else {
            setToken(null);
            storeUser(null);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const stored = getUser();
        if (stored) setUserState(stored);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, _password, _name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: _password })
      });
      const data = await res.json();
      if (data.success) {
        const u = { id: data.user.id, email: data.user.email, name: data.user.name };
        setToken(data.token);
        storeUser(u);
        setUserState(u);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (data.success) {
        const u = { id: data.user.id, email: data.user.email, name: data.user.name };
        setToken(data.token);
        storeUser(u);
        setUserState(u);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    storeUser(null);
    setToken(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>);

}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}