import React from "react";
import { createContext } from "react";
import { AuthContext } from "./Context";

export const FirebaseContext = createContext(null)
export const ChatContext = createContext()

export default function ChatContextProvider({ children }) {
  const { currentUser } = React.useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: 'null',
    user: {}
  }
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
        }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(chatReducer, INITIAL_STATE)
  
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

