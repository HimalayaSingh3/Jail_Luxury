// contexts/AppContext.js
import { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export function AppContextProvider({ children }) {
  // Define multiple states that you want to share globally
  const [categoryItems, setCategoryItems] = useState([]);
  const [user,setUser] =  useState({});
  const [state2, setState2] = useState('Initial State 2');

  // You can add any additional logic here if needed

  return (
    <AppContext.Provider value={{ categoryItems, setCategoryItems, state2, setState2 ,user,setUser}}>
      {children}
    </AppContext.Provider>
  );
}
