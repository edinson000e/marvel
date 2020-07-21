import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../../store";

import {
  getCharacters,
  getDetailsCharacter,
  resetSelectCharacter
} from "../../actions";

import { PageLayout, Card, Grid, Modal, DetailsCharacter } from "../common";
import ModalDetails from "./modalDetails";
import { Paginator } from "../common/Paginator";
const Characters = props => {
  const [{ characters, modal }, dispatch] = useStateValue();
  const [error, seterror] = useState(false);
  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  let pagNumber = props.match.params.pag;
  useEffect(() => {
    console.log("pagNumber", pagNumber);

    if (!pagNumber) {
      pagNumber = 1;
    }
    if (is_numeric(pagNumber)) {
      let offset = parseInt(20) * (parseInt(pagNumber) - 1);
      console.log("pagination.offset", offset);
      getCharacters(dispatch, 20, offset);
    } else seterror(true);
  }, [pagNumber]);
  const Ref = useRef();
  return (
    <PageLayout>
      {!error ? (
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
      ) : (
        <p> error</p>
      )}
    </PageLayout>
  );
};

export default Characters;
