import React, { useEffect, useCallback, useState } from "react";
import {
  ContainerLoading,
  Grid,
  Card,
  TitleDescription
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { seatchGetCharacter } from "../../actions/search";
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { useLocalStorage } from "../../customHook/useLocalStorage";
const Search = () => {
  const [{ search }, dispatch] = useStateValue();

  const [randomCharacter, setRandomCharacter] = useLocalStorage(
    "randomCharacter"
  );
  const [result, setresult] = useState(randomCharacter);

  const initFetch = useCallback(
    async (ofset, signal) => {
      return await seatchGetCharacter(dispatch, 1, ofset, signal).then(
        result => {
          if (result) setRandomCharacter(result);
          return result;
        }
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!randomCharacter) {
      initFetch(0, signal).then(result => {
        setresult(result);
      });
    } else {
      let min = Math.ceil(0);
      let max = Math.floor(randomCharacter.total);
      let result = Math.floor(Math.random() * (max - min + 1)) + min;

      initFetch(result, signal);
    }

    return () => {
      abortController.abort();
    };
  }, [initFetch]);

  return (
    <Container>
      {search.isFetching && !result ? (
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
                    getDetailsCharacter(
                      result.results[0].comics.collectionURI,
                      result.results[0].name,
                      dispatch
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
