import React from "react";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { Accordion, Message } from "../../components/common";
const SearchComics = () => {
  const [searchComics] = useLocalStorage("searchComics");

  return (
    <Accordion itemId={"idSearchComics"} title={"Search Comics"}>
      {searchComics &&
      Array.isArray(searchComics) &&
      searchComics.length > 0 ? (
        searchComics.map((value, index) => {
          return <p key={index}> {value.name}</p>;
        })
      ) : (
        <Message title="comics" />
      )}
    </Accordion>
  );
};

export default SearchComics;
