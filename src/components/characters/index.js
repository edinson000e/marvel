import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../../store";

import { getCharacters, getDetailsCharacter } from "../../actions";

import {
  PageLayout,
  Card,
  Grid,
  ContainerLoading,
  ContainerError
} from "../common";

import { Container } from "../common/Search";
import ModalDetails from "./modalDetails";
import { Paginator } from "../common/Paginator";
const Characters = props => {
  const [{ characters }, dispatch] = useStateValue();
  const [error, seterror] = useState(false);
  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  let pagNumber = props.match.params.pag;
  useEffect(() => {
    if (!pagNumber) {
      pagNumber = 1;
    }
    if (is_numeric(pagNumber)) {
      let offset = parseInt(20) * (parseInt(pagNumber) - 1);
      getCharacters(dispatch, 20, offset);
    } else seterror(true);
  }, [pagNumber]);
  const Ref = useRef();
  return (
    <PageLayout>
      {!error && !characters.error ? (
        characters.isFeching ? (
          <ContainerLoading />
        ) : (
          <>
            <Grid>
              {characters.results.length > 0 &&
                characters.results.map((value, index) => {
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
            characters.error
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
