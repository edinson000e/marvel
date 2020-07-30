import React from "react";
import { useLocalStorageArray } from "../../customHook/useLocalStorage";
import {
  Accordion,
  Message,
  StyledLinkFavorities,
  CloseButton
} from "../../components/common";
import { HeaderModal as Header } from "../../components/common/Modal";

const SearchComics = () => {
  const [searchComics, setSearchComics] = useLocalStorageArray(
    "searchComics",
    []
  );

  return (
    <Accordion title={"Search Comics"}>
      {searchComics &&
      Array.isArray(searchComics) &&
      searchComics.length > 0 ? (
        searchComics.map((value, index) => {
          return (
            <Header key={index}>
              <StyledLinkFavorities to={value.redirection} key={index}>
                {value.name}
              </StyledLinkFavorities>

              <CloseButton
                onClick={() => {
                  setSearchComics(value.key);
                }}
              />
            </Header>
          );
        })
      ) : (
        <Message title="comics" />
      )}
    </Accordion>
  );
};

export default SearchComics;
