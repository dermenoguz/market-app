import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const setUserDataContext = (data) => {
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, setUserDataContext }}>
      {children}
    </UserContext.Provider>
  );
};
