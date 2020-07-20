import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import {
  getCharacters,
  getDetailsCharacter,
  resetSelectCharacter
} from "../../actions";

import { PageLayout, Card, Grid, Modal, DetailsCharacter } from "../common";
import SelectCharacter from "./selectCharacter";
const Characters = () => {
  const [{ characters, modal }, dispatch] = useStateValue();

  useEffect(() => {
    getCharacters(dispatch);
  }, []);

  return (
    <PageLayout>
      <Grid>
        {characters.results.length > 0 &&
          characters.results.map((value, index) => {
            let title = value.name;
            return (
              <Card
                key={index}
                title={value.name}
                photo={value.thumbnail.path + "." + value.thumbnail.extension}
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
      <Modal onClose={() => dispatch(resetSelectCharacter())}>
        <SelectCharacter />
      </Modal>
    </PageLayout>
  );
};

export default Characters;
