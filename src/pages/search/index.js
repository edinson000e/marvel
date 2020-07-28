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
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  useLocation
} from "react-router-dom";
import SearchCharacter from "./character";
import SearchComics from "./comics";
const initialState = [
  {
    path: "/",
    text: "search"
  }
];
const Search = ({ match, location, history }) => {
  const [state, setstate] = useState();

  const [actionBreadcrumb, setactionBreadcrumb] = useState(initialState);

  return (
    <PageLayout>
      <Container>
        <Breadcrumb actions={actionBreadcrumb} />
        <SearchWithLink match={match} state={state} />
        <Redirect exact from="/" to="/search/character" />
        <Route
          path="/search/character"
          render={props => {
            console.log("entre aca en propd");
            setstate("character");
            return <SearchCharacter {...props} propTypeSearch="character" />;
          }}
        />
        <Route
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
            return <SearchComics {...props} propTypeSearch="comic" />;
          }}
        />
        <Route
          path="/search/comic"
          render={props => {
            setstate("comic");
            return <SearchComics {...props} propTypeSearch="comic" />;
          }}
        />
      </Container>
    </PageLayout>
  );
};

export default Search;
