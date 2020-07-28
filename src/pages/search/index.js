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
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import SearchCharacter from "./character";
import SearchCharacterInit from "./characterInit";
import SearchComics from "./comics";
import SearchComicInit from "./comicInit";

const Search = ({ match }) => {
  const [state, setstate] = useState();

  const actionBreadcrumb = [
    {
      path: "/",
      text: "search"
    }
  ];

  return (
    <PageLayout>
      <Container>
        <Breadcrumb actions={actionBreadcrumb} />
        <SearchWithLink match={match} state={state} />

        <Switch>
          <Route
            exact
            path="/search"
            render={() => <Redirect to="/search/character" />}
          />
          <Route
            exact
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
            exact
            path="/search/comic"
            render={props => {
              setstate("comic");
              return <SearchComicInit {...props} propTypeSearch="comic" />;
            }}
          />
        </Switch>
      </Container>
    </PageLayout>
  );
};

export default Search;
