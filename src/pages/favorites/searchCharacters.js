import React from "react";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { Accordion } from "../../components/common/Accordion";
const SearchCharacters = () => {
  const [searchCharacter] = useLocalStorage("searchCharacters");

  return (
    <Accordion title={"Search characters"}>
      {searchCharacter.map((value, index) => {
        return <p key={index}> {value.name}</p>;
      })}
    </Accordion>
  );
};

export default SearchCharacters;
