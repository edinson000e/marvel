import React, { useEffect, useRef, useCallback } from "react";
import { useStateValue } from "../../store";
import { useStatechacterValue } from "../../store/chacters";
import { useStateChactersComicsValue } from "../../store/chactersComics";
import { getDetailsCharacter } from "../../actions";

import {
  Card,
  Grid,
  ContainerLoading,
  ContainerError
} from "../../components/common";
import ModalDetails from "./modalDetails";
import { Paginator } from "../../components/common/Paginator";

const Characters = props => {
  const dispatchContext = useStateValue();

  let dispatch;

  if (dispatchContext) dispatch = dispatchContext[1];

  const characters = useStatechacterValue();
  const charactersComics = useStateChactersComicsValue();
  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const initFetch = useCallback(offset => {
    let limit = 20;
    if (characters)
      characters.fetchApi(
        `/v1/public/characters?limit=${limit}&offset=${offset}`
      );
  }, []);

  useEffect(() => {
    let pagNumber = props.match.params.pag;
    if (!pagNumber) {
      pagNumber = 1;
    }
    if (is_numeric(pagNumber)) {
      let offset = parseInt(20) * (parseInt(pagNumber) - 1);
      initFetch(offset);
    }
  }, [initFetch, props.match.params.pag]);
  const Ref = useRef();

  return (
    <>
      {characters &&
      (characters.isLoading ||
        (!characters.isLoading && characters.data.length === 0)) ? (
        <ContainerLoading />
      ) : characters && characters.data.total === 0 ? (
        <ContainerError
          title={
            characters && characters.error
              ? "Sorry! We couldn't find any results."
              : "There was a search error."
          }
          subTitle="Please try again"
        />
      ) : (
        <>
          <Grid>
            {characters &&
              characters.data.results.length > 0 &&
              characters.data.results.map((value, index) => {
                let title = value.name;

                const regex = /http/gi;
                let url;
                if (
                  value.comics &&
                  value.comics.collectionURI &&
                  value.comics.collectionURI.length > 0
                )
                  url = value.comics.collectionURI.replace(regex, "https");

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
                        url,
                        title,
                        dispatch,
                        charactersComics.fetchApi
                      );
                    }}
                  />
                );
              })}
          </Grid>
          <ModalDetails />
          {characters && (
            <Paginator
              refElement={Ref}
              pag={props.match.params.pag}
              all={characters.data.total}
            ></Paginator>
          )}
        </>
      )}
    </>
  );
};

export default Characters;
