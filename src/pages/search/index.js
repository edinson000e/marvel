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

import { SearchWithLink } from "../../components/common/Search";
import { Route, Redirect } from "react-router-dom";
import SearchCharacter from "./character";
import SearchCharacterInit from "./characterInit";
import SearchComics from "./comics";
const initialState = [
  {
    path: "/",
    text: "search"
  }
];
const Search = ({ match }) => {
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
            setstate("character");
            return (
              <SearchCharacterInit {...props} propTypeSearch="character" />
            );
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
