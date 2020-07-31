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

import { useLocalStorage } from "../../customHook/useLocalStorage";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
const Search = () => {
  const [{ search }, dispatch] = useStateValue();

  const [randomComic, setRandomComic] = useLocalStorage("randomComic");

  const comics = useStateComicsValue();

  const [result, setresult] = useState({});
  const history = useHistory();
  const [searchRandon, setsearchRandon] = useState(false);

  const initFetchComic = useCallback(
    async offset => {
      setsearchRandon(true);
      let limit = 1;
      comics.fetchApi(
        `/v1/public/comics?limit=${limit}&offset=${offset}&orderBy=focDate`,
        "&"
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!searchRandon) {
      console.log("result", result);
      console.log("character", comics);
      console.log("randomComic", randomComic);
      console.log(
        "isEqual(result, comics)",
        isEqual(JSON.stringify(result), JSON.stringify(comics.data))
      );

      console.log("entre aca");
      if (!randomComic) {
        initFetchComic(0, signal);
      } else {
        setresult(randomComic);
        let min = Math.ceil(0);
        let max = Math.floor(randomComic.total);
        let result = Math.floor(Math.random() * (max - min + 1)) + min;

        initFetchComic(result, signal);
      }
    } else if (!comics.isLoading) {
      console.log("no tengo nada q hacer aca", comics);

      if (Object.entries(result).length === 0) {
        setresult(comics.data);
        setsearchRandon(false);
      }
      setRandomComic(comics.data);
    }
    return () => {
      abortController.abort();
    };
  }, [initFetchComic, comics, searchRandon]);

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
        </>
      )}
    </Container>
  );
};

export default Search;
