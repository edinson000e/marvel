import React, { useEffect, useCallback, useState } from "react";
import {
  PageLayout,
  ContainerLoading,
  Breadcrumb,
  TitleDescription,
  Grid,
  Card
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { searchCharacters, resetSearch } from "../../actions/search";
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { SearchWithLink } from "../../components/common/Search";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import SearchCharacter from "./character";
const initialState = [
  {
    path: "/",
    text: "search"
  }
];
const Search = ({ match, location, history }) => {
  const [state, setstate] = useState();

  useEffect(() => {
    console.log("searacg", state);
    console.log("location.pathname", location.pathname);
  }, [state]);
  const [actionBreadcrumb, setactionBreadcrumb] = useState(initialState);

  return (
    <PageLayout>
      <Container>
        <Breadcrumb actions={actionBreadcrumb} />
        <SearchWithLink match={match} state={state} />

        <Route
          exact
          path="/search/character"
          render={props => {
            console.log("entre aca en propd");
            setstate("character");
            return <SearchCharacter {...props} propTypeSearch="character" />;
          }}
        />
        <Route
          exact
          path="/search/character=:id"
          render={props => {
            setstate("character");
            return <SearchCharacter {...props} propTypeSearch="character" />;
          }}
        />
        <Route
          path="/search/comic=:id"
          render={props => {
            setstate("comic");
            return <SearchCharacter {...props} propTypeSearch="comic" />;
          }}
        />
        <Route
          path="/search/comic"
          render={props => {
            setstate("comic");
            return <SearchCharacter {...props} propTypeSearch="comic" />;
          }}
        />
      </Container>
    </PageLayout>
  );
};

export default Search;
