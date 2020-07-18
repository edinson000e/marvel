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
import history from "./store/browserHistory";
import LightTheme from "./themes/light";
import DarkTheme from "./themes/dark";

const GlobalStyle = createGlobalStyle`
	body{
		background: ${p => p.theme.bodyBackgroundColor};
		min-height: 100vh;
		margin: 0;
		color: ${p => p.theme.bodyFontColor};
		font-family: 'Kaushan Script'
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Characteres {...props} />} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
