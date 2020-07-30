import React from "react";
import { PageLayout, Breadcrumb } from "../../components/common";
import { Container } from "../../components/common/Search";
import SearchCharacter from "./searchCharacters";
import SearchComics from "./searchComics";
const actionBreadcrumb = [
  {
    path: "/",
    text: "favorities"
  }
];

const Favorites = () => {
  return (
    <Container>
      <Breadcrumb actions={actionBreadcrumb} />

      <SearchCharacter />
      <SearchComics />
    </Container>
  );
};

export default Favorites;
