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
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";

const SearchComics = props => {
  const [{ comics }, dispatch] = useStateValue();
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
                        dispatch
                      );
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
