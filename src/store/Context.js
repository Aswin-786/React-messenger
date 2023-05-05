import React from "react";
import { createContext } from "react";

export const FirebaseContext = createContext(null)
export const AuthContext = createContext(null)

export default function Context({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null)
  const [img, setImg] = React.useState(null)
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, img, setImg }}>
      {children}
    </AuthContext.Provider>
  )
}