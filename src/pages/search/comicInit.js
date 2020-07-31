import React, { useEffect, useCallback, useState } from "react";
import {
  ContainerLoading,
  Grid,
  Card,
  TitleDescription
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { seatchGetComic } from "../../actions/comics";
import { useStateComicsValue } from "../../store/comics";

import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { useLocalStorage } from "../../customHook/useLocalStorage";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [{ search }, dispatch] = useStateValue();

  const [randomComic, setRandomComic] = useLocalStorage("randomComic");

  const comics = useStateComicsValue();

  const [result, setresult] = useState();
  const history = useHistory();
  const initFetchComic = useCallback(
    async (ofset, signal, setRandomComic) => {
      return await seatchGetComic(dispatch, 1, ofset, signal, setRandomComic);
    },
    [dispatch]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!randomComic) {
      initFetchComic(0, signal).then(result => {
        setresult(result);
      });
    } else {
      setresult(randomComic);

      let min = Math.ceil(0);
      let max = Math.floor(randomComic.total);
      let result = Math.floor(Math.random() * (max - min + 1)) + min;

      initFetchComic(result, signal, setRandomComic);
    }
    return () => {
      abortController.abort();
    };
  }, [initFetchComic]);

  return (
    <Container>
      {search.isFetching && !result ? (
        <ContainerLoading />
      ) : (
        <>
          <TitleDescription dark center>
            Recommended for you
          </TitleDescription>{" "}
          {result && Object.entries(result).length > 0 && (
            <Grid total={result.results.length}>
              <div>
                {result && result.results[0] && (
                  <Card
                    title={result.results[0].title}
                    photo={
                      result.results[0].thumbnail.path +
                      "." +
                      result.results[0].thumbnail.extension
                    }
                    description={result.results[0].description}
                    onClick={() => {
                      history.push(`/comic/${result.results[0].id}`);
                    }}
                  />
                )}
              </div>
            </Grid>
          )}
          <Modal />
        </>
      )}
    </Container>
  );
};

export default Search;
