import React, { useState } from "react";
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
const GlobalStyle = createGlobalStyle`
	body{
		background: white;
		min-height: 100vh;
		margin: 0;
		color: ${p => p.theme.bodyFontColor};
		font-family: 'Kaushan Script';
    
	}
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);
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
    </ThemeProvider>
  );
}

export default App;
