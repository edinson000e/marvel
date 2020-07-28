import React, { useEffect, useCallback } from "react";
import {
  PageLayout,
  ContainerLoading,
  Breadcrumb,
  TitleDescription,
  Grid,
  Card
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { searchComics, resetComics } from "../../actions/comics";

import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../customHook/useLocalStorage";
const SearchComics = props => {
  const [{ comics }, dispatch] = useStateValue();
  const [searchComicsLocal, setSearchComicsLocal] = useLocalStorage(
    "searchComicsLocal",
    []
  );
  const history = useHistory();
  let param = props.match.params.id;
  const initFetch = useCallback(() => {
    searchComics(dispatch, param);
  }, [dispatch, param]);

  const initResetFetch = useCallback(() => {
    dispatch(resetComics());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
    return () => {
      initResetFetch();
    };
  }, [initFetch, initResetFetch]);

  return (
    <Container>
      {comics.isFetching ? (
        <ContainerLoading />
      ) : comics.complete && comics.count === 0 ? (
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
            {comics.results.length > 0 &&
              comics.results.map((value, index) => {
                let title = value.title;
                return (
                  <Card
                    key={index}
                    title={title}
                    photo={
                      value.thumbnail.path + "." + value.thumbnail.extension
                    }
                    description={value.description}
                    onClick={() => {
                      history.push(`/comic/${value.id}`);
                    }}
                  />
                );
              })}
          </Grid>
          <Modal />
        </>
      )}
    </Container>
  );
};

export default SearchComics;
