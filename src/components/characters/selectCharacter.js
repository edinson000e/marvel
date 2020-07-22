import React from "react";
import {
  DetailsCharacter,
  StyledLinkButton,
  ContainerLoading
} from "../common";
import { useStateValue } from "../../store";
import { DataSelectCharacter, resetSelectCharacter } from "../../actions";
import { closeModal } from "../../actions/modal";
import SelectContainerRef from "./selectContainerRef";

const SelectCharacter = () => {
  const [{ character }, dispatch] = useStateValue();

  const suspensionPoints = (text, limit) => {
    let points = "...";
    if (text && text.length > limit) {
      limit = text.indexOf(" ", limit);
      text = text.substring(0, limit + 1) + points;
    } else if (!text) {
      text = "There is no description.";
    }
    return text;
  };

  return (
    <SelectContainerRef>
      {character.isFetching ? (
        <ContainerLoading />
      ) : character.results.length > 0 ? (
        character.results.map((value, index) => {
          return (
            <StyledLinkButton
              key={index}
              to={`/commics/${value.id}`}
              onClick={() => {
                dispatch(resetSelectCharacter());
                dispatch(closeModal());
                dispatch(DataSelectCharacter(value));
              }}
            >
              <DetailsCharacter
                title={value.title}
                url={value.thumbnail.path + "." + value.thumbnail.extension}
                description={suspensionPoints(value.description, 150)}
              />
            </StyledLinkButton>
          );
        })
      ) : (
        <h4>Sorry, there are no results for your selection.</h4>
      )}
    </SelectContainerRef>
  );
};

export default SelectCharacter;
