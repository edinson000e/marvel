import React, { useEffect, useState } from "react";
import {
  PageLayout,
  CommonDetailsCharacter,
  Breadcrumb,
  TitleDescription
} from "../common";
import { Container } from "../common/Search";
import { searchCharacters } from "../../actions/search";
import { useStateValue } from "../../store";

const Search = props => {
  const [{ search }, dispatch] = useStateValue();

  useEffect(() => {
    searchCharacters(dispatch, props.match.params.id);
  }, []);
  let actions = [
    {
      path: "/",
      text: "search"
    }
  ];
  return (
    <PageLayout>
      <Container>
        <Breadcrumb actions={actions} />
        <TitleDescription dark>
          Sorry! We couldn't find any results to "{props.match.params.id}"{" "}
        </TitleDescription>{" "}
        <h2>If you're not happy with the results, please do another search</h2>
      </Container>
    </PageLayout>
  );
};

export default Search;
