import React, { useEffect, useCallback, useState } from "react";
import {
  ContainerLoading,
  Grid,
  Card,
  TitleDescription
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { resetSearch, seatchGetCharacter } from "../../actions/search";
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { useLocalStorage } from "../../customHook/useLocalStorage";
const Search = () => {
  const [{ search }, dispatch] = useStateValue();

  const [randomCharacter, setRandomCharacter] = useLocalStorage();
  const [result, setresult] = useState(randomCharacter);

  const initFetch = useCallback(
    async ofset => {
      return await seatchGetCharacter(dispatch, 1, ofset).then(result => {
        if (result) setRandomCharacter(result);
      });
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("entre en useefect", randomCharacter);
    if (!randomCharacter) {
      initFetch(0).then(result => {
        setresult(result);
      });
    } else {
      let min = Math.ceil(0);
      let max = Math.floor(randomCharacter.total);
      let result = Math.floor(Math.random() * (max - min + 1)) + min;

      initFetch(result);
    }
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
          <Grid>
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
          </Grid>
          <Modal />
        </>
      )}
    </Container>
  );
};

export default Search;
