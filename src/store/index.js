import React, { useContext, useReducer } from "react";
import { StateContext } from "../utils/context";
import { StateChactersProvider } from "./chacters";
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      <StateChactersProvider>{children}</StateChactersProvider>
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
