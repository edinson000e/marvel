import React from "react";
import { useLocalStorageArray } from "../../customHook/useLocalStorage";
import {
  Accordion,
  Message,
  StyledLinkFavorities,
  CloseButton
} from "../../components/common";
import { HeaderModal as Header } from "../../components/common/Modal";

const SearchCharacters = () => {
  const [searchCharacters, setSearchCharacters] = useLocalStorageArray(
    "searchCharacters",
    []
  );

  return (
    <Accordion title={"Search characters"}>
      {searchCharacters &&
      Array.isArray(searchCharacters) &&
      searchCharacters.length > 0 ? (
        searchCharacters.map((value, index) => {
          return (
            <Header key={index}>
              <StyledLinkFavorities to={value.redirection} key={index}>
                {value.name}
              </StyledLinkFavorities>

              <CloseButton
                onClick={() => {
                  setSearchCharacters(value.key);
                }}
              />
            </Header>
          );
        })
      ) : (
        <Message title="characters" />
      )}
    </Accordion>
  );
};

export default SearchCharacters;
