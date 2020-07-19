import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import {
  Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Characteres from "./components/characters";
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
		font-family: 'Kaushan Script';
    
	}
`;

function App() {
  const modalRef = useRef();
  const [theme, setTheme] = useState(LightTheme);
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    console.log("entre en efect app", modalRef.current);
    dispatch(initRefModal(modalRef.current));
  }, []);

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

            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </Cont>
      <div ref={modalRef} />
    </ThemeProvider>
  );
}

export default App;
