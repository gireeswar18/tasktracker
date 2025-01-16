import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    tasks: []
  });

  const [dark, setDark] = useState(true);

  const value = {
    user, setUser, dark, setDark
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;