import React, { useEffect, useCallback } from "react";
import {
  ContainerLoading,
  TitleDescription,
  Grid,
  Card
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { searchCharacters, resetSearch } from "../../actions/search";
import { reset } from "../../actions/global";
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import { useStateChactersComicsValue } from "../../store/chactersComics";
import Modal from "../characters/modalDetails";
import { useLocalStorageSearch } from "../../customHook/useLocalStorage";

const Search = props => {
  const [{ global }, dispatch] = useStateValue();
  let url = `/v1/public/characters?nameStartsWith=${props.match.params.id}`;
  const searchCharactersData = useLocalStorageSearch("searchCharacters", url);
  const charactersComics = useStateChactersComicsValue();

  useEffect(() => {
    console.log("searchCharactersData", searchCharactersData);
    return () => {
      dispatch(reset());
    };
  }, [url]);
  console.log("searchCharactersData", searchCharactersData);
  return (
    <Container>
      {global.isFetching ? (
        <ContainerLoading />
      ) : global.success ? (
        searchCharactersData.total === 0 ? (
          <>
            <TitleDescription dark>
              Sorry! We couldn't find any results to "{props.match.params.id}"{" "}
            </TitleDescription>{" "}
            <h2>
              If you're not happy with the results, please do another search
            </h2>
          </>
        ) : (
          <>
            <Grid>
              {searchCharactersData.results.length > 0 &&
                searchCharactersData.results.map((value, index) => {
                  let title = value.name;
                  return (
                    <Card
                      key={index}
                      title={value.name}
                      photo={
                        value.thumbnail.path + "." + value.thumbnail.extension
                      }
                      description={value.description}
                      onClick={() => {
                        getDetailsCharacter(
                          value.comics.collectionURI,
                          title,
                          dispatch,
                          charactersComics.fetchApi
                        );
                      }}
                    />
                  );
                })}
            </Grid>
            <Modal />
          </>
        )
      ) : (
        <h2>error</h2>
      )}
    </Container>
  );
};

export default Search;
