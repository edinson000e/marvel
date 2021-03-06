import React, { useContext, useReducer } from "react";
import { StateContext } from "../utils/context";
import { StateChactersProvider } from "./chacters";
import { StateChactersComicsProvider } from "./chactersComics";
import { StateComicsProvider } from "./comics";
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      <StateChactersProvider>
        <StateChactersComicsProvider>
          <StateComicsProvider>{children}</StateComicsProvider>
        </StateChactersComicsProvider>
      </StateChactersProvider>
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
