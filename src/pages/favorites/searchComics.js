import React from "react";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { Accordion } from "../../components/common/Accordion";
const SearchComics = () => {
  const [searchCharacter] = useLocalStorage("searchComics");

  return (
    <Accordion itemId={"idSearchComics"} title={"Search Comics"}>
      {searchCharacter.map((value, index) => {
        return <p key={index}> {value.name}</p>;
      })}
    </Accordion>
  );
};

export default SearchComics;
