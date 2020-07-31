import React from "react";
import {
  DetailsCharacter,
  StyledLinkButton,
  ContainerLoading
} from "../../components/common";
import { useStateValue } from "../../store";
import { useStateChactersComicsValue } from "../../store/chactersComics";
import { DataSelectCharacter, resetSelectCharacter } from "../../actions";
import { closeModal } from "../../actions/modal";
import SelectContainerRef from "./selectContainerRef";

const SelectCharacter = () => {
  const [{ character }, dispatch] = useStateValue();
  const charactersComics = useStateChactersComicsValue();
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
      {charactersComics.isLoading ? (
        <ContainerLoading />
      ) : charactersComics.data.total === 0 ? (
        <h4>Sorry, there are no results for your selection.</h4>
      ) : (
        <>
          {charactersComics.data.results.map((value, index) => {
            return (
              <StyledLinkButton
                key={index}
                to={`/comic/${value.id}`}
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
          })}
        </>
      )}
    </SelectContainerRef>
  );
};

export default SelectCharacter;
