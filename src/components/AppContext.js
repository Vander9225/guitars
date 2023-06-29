import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../api';
import { onAuthStateChanged, signOut } from 'firebase/auth';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return listen();
  }, [authUser]);

  const sharedState = {
    loading,
    setLoading,
    user,
    setUser,
    message,
    setMessage,
    success,
    setSuccess,
    authUser,
    setAuthUser,
  };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
};