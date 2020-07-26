import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStateValue } from "../../store";

import { getCharacters, getDetailsCharacter } from "../../actions";

import {
  PageLayout,
  Card,
  Grid,
  ContainerLoading,
  ContainerError
} from "../../components/common";
import ModalDetails from "./modalDetails";
import { Paginator } from "../../components/common/Paginator";
const Characters = props => {
  //const [{ characters }, dispatch] = useStateValue();

  const [error, seterror] = useState(false);
  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  const state = useStateValue();

  let dispatch;
  let characters;
  if (state) {
    characters = state[0].characters;
    dispatch = state[1];
  }

  const initFetch = useCallback(
    offset => {
      if (dispatch) getCharacters(dispatch, 20, offset);
    },
    [dispatch]
  );

  useEffect(() => {
    seterror(false);
    let pagNumber = props.match.params.pag;
    if (!pagNumber) {
      pagNumber = 1;
    }
    if (is_numeric(pagNumber)) {
      let offset = parseInt(20) * (parseInt(pagNumber) - 1);
      initFetch(offset);
    } else seterror(true);
  }, [initFetch, props.match.params.pag]);
  const Ref = useRef();
  return (
    <PageLayout>
      {!error && characters && !characters.error ? (
        characters.isFeching ? (
          <ContainerLoading />
        ) : (
          <>
            <Grid>
              {characters.results.length > 0 &&
                characters.results.map((value, index) => {
                  let title = value.name;

                  const regex = /http/gi;
                  let url = value.comics.collectionURI.replace(regex, "https");

                  return (
                    <Card
                      key={index}
                      title={value.name}
                      photo={
                        value.thumbnail.path + "." + value.thumbnail.extension
                      }
                      description={value.description}
                      onClick={() => {
                        getDetailsCharacter(url, title, dispatch);
                      }}
                    />
                  );
                })}
            </Grid>
            <ModalDetails />
            <Paginator
              refElement={Ref}
              pag={props.match.params.pag}
              all={characters.total}
            ></Paginator>
          </>
        )
      ) : (
        <ContainerError
          title={
            characters && characters.error
              ? " Sorry! We couldn't find any results."
              : "There was a search error."
          }
          subTitle="Please try again"
          onClick={() => seterror(false)}
        />
      )}
    </PageLayout>
  );
};

export default Characters;
