import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Characteres from "./components/characters";
import { DetailsCharacter } from "./components/characters/detailsCharacter";
import Search from "./components/search";
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
    
	}
`;

function App() {
  const modalRef = useRef();
  const [theme, setTheme] = useState(LightTheme);

  const state = useStateValue();

  let dispatch;

  if (state) dispatch = state[1];
  const initFetch = useCallback(() => {
    console.log("entre aca", modalRef.current);
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
              exact
              path="/commics/:id"
              render={props => <DetailsCharacter {...props} />}
            />
            <Route
              exact
              path="/search/q=:id"
              render={props => <Search {...props} />}
            />

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
