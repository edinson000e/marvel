import React from "react";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { Accordion, Message } from "../../components/common";

const SearchCharacters = () => {
  const [searchCharacters] = useLocalStorage("searchCharacters");

  return (
    <Accordion title={"Search characters"}>
      {searchCharacters &&
      Array.isArray(searchCharacters) &&
      searchCharacters.length > 0 ? (
        searchCharacters.map((value, index) => {
          return <p key={index}> {value.name}</p>;
        })
      ) : (
        <Message title="characters" />
      )}
    </Accordion>
  );
};

export default SearchCharacters;
