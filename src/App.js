import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Characteres from "./pages/characters";
import { DetailsCharacter } from "./pages/commics/detailsCharacter";

import Search from "./pages/search";

import LightTheme from "./themes/light";
import DarkTheme from "./themes/dark";
import { Cont } from "./components/common";
import { useStateValue } from "./store";
import { initRefModal } from "./actions/modal";
const GlobalStyle = createGlobalStyle`
	body{
		background: ${p => p.theme.bodyBackgroundColor};
		min-height: 100vh;
		margin: 0;
		color: ${p => p.theme.bodyFontColor};
		font-family: 'Open Sans';
    @media  (max-width: 320px){
       
    width: 100%;
    overflow-x: overlay;
    min-width: 320px;
    display: flex;
   
    overflow-x: auto;}
	}
`;

function App() {
  const modalRef = useRef();
  const [theme, setTheme] = useState(LightTheme);

  const state = useStateValue();

  let dispatch;

  if (state) dispatch = state[1];
  const initFetch = useCallback(() => {
    if (typeof dispatch === "function")
      dispatch(initRefModal(modalRef.current));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(s => (s.id === "light" ? DarkTheme : LightTheme));
        }
      }}
    >
      <GlobalStyle />
      <Cont>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Characteres {...props} />}
            />

            <Route
              path="/comic/:id"
              render={props => <DetailsCharacter {...props} />}
            />

            <Route path="/search" render={props => <Search {...props} />} />

            <Route
              exact
              path="/p=:pag"
              render={props => <Characteres {...props} />}
            />

            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </Cont>
      <div ref={modalRef} />
    </ThemeProvider>
  );
}

export default App;
