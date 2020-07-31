import React from "react";
import { Breadcrumb } from "../../components/common";
import { Container } from "../../components/common/Search";

import { SearchWithLink } from "../../components/common/Search";
import { Route, Redirect, Switch } from "react-router-dom";
import SearchCharacter from "./character";
import SearchCharacterInit from "./characterInit";
import SearchComics from "./comics";
import SearchComicInit from "./comicInit";

const Search = props => {
  const match = props.match;
  const actionBreadcrumb = [
    {
      path: "/",
      text: "search"
    }
  ];

  return (
    <Container>
      <Breadcrumb actions={actionBreadcrumb} />
      <SearchWithLink match={match} />

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
            return (
              <SearchCharacterInit {...props} propTypeSearch="character" />
            );
          }}
        />
        <Route
          path="/search/character=:id"
          render={props => {
            return <SearchCharacter {...props} propTypeSearch="character" />;
          }}
        />
        <Route
          path="/search/comic=:id"
          render={props => {
            return <SearchComics {...props} propTypeSearch="comic" />;
          }}
        />
        <Route
          exact
          path="/search/comic"
          render={props => {
            return <SearchComicInit {...props} propTypeSearch="comic" />;
          }}
        />
      </Switch>
    </Container>
  );
};

export default Search;
