import React, { useEffect, useCallback, useState } from "react";
import {
  ContainerLoading,
  Grid,
  Card,
  TitleDescription
} from "../../components/common";
import { Container } from "../../components/common/Search";

import { openModal } from "../../actions/modal";
import { useStateValue } from "../../store";
import { useStatechacterValue } from "../../store/chacters";
import Modal from "../characters/modalDetails";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { useStateChactersComicsValue } from "../../store/chactersComics";
import { isEqual } from "lodash";
const Search = () => {
  const dispatchContext = useStateValue();

  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];

  const characters = useStatechacterValue();
  const charactersComics = useStateChactersComicsValue();
  const [randomCharacter, setRandomCharacter] = useLocalStorage(
    "randomCharacter"
  );
  const [result, setresult] = useState({});

  const [searchRandon, setsearchRandon] = useState(false);
  const initFetch = useCallback(
    async (offset, signal) => {
      console.log("entre aca en initfetch");
      setsearchRandon(true);
      let limit = 1;
      if (characters)
        characters.fetchApi(
          `/v1/public/characters?limit=${limit}&offset=${offset}`
        );
    },
    [characters]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!searchRandon) {
      console.log(
        "isEqual(result, characters)",
        isEqual(JSON.stringify(result), JSON.stringify(characters.data))
      );

      console.log("entre aca");
      if (!randomCharacter) {
        console.log("esta vacio entro aca");
        console.log("llamo a initi fe ");
        initFetch(0, signal);
      } else {
        setresult(randomCharacter);
        let min = Math.ceil(0);
        let max = Math.floor(randomCharacter.total);
        let result = Math.floor(Math.random() * (max - min + 1)) + min;

        initFetch(result, signal);
      }
    } else if (
      characters.data.limit === 1 &&
      !characters.isLoading &&
      searchRandon &&
      !isEqual(JSON.stringify(result), JSON.stringify(characters.data))
    ) {
      if (
        !isEqual(
          JSON.stringify(randomCharacter),
          JSON.stringify(characters.data)
        )
      ) {
        if (Object.entries(result).length === 0) {
          console.log("esta vacio");
          setresult(characters.data);
          setsearchRandon(false);
        }
        setRandomCharacter(characters.data);
      }
    }

    return () => {
      abortController.abort();
    };
  }, [
    initFetch,
    characters,
    searchRandon,
    randomCharacter,
    setRandomCharacter,
    result
  ]);

  return (
    <Container>
      {Object.entries(result).length === 0 ? (
        <ContainerLoading />
      ) : (
        <>
          <TitleDescription dark center>
            Recommended for you
          </TitleDescription>{" "}
          <Grid total={result.results.length}>
            <div>
              {result && result.results[0] && (
                <Card
                  title={result.results[0].name}
                  photo={
                    result.results[0].thumbnail.path +
                    "." +
                    result.results[0].thumbnail.extension
                  }
                  description={result.results[0].description}
                  onClick={() => {
                    dispatch(openModal({ title: result.results[0].name }));
                    charactersComics.fetchApi(
                      `${result.results[0].comics.collectionURI}?orderBy=focDate`
                    );
                  }}
                />
              )}
            </div>
          </Grid>
          <Modal />
        </>
      )}
    </Container>
  );
};

export default Search;
