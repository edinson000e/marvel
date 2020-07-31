import React from "react";
import {
  DetailsCharacter,
  StyledLinkButton,
  ContainerLoading
} from "../../components/common";
import { useStateValue } from "../../store";
import { useStateChactersComicsValue } from "../../store/chactersComics";

import { closeModal } from "../../actions/modal";
import SelectContainerRef from "./selectContainerRef";

const SelectCharacter = () => {
  const dispatchContext = useStateValue();

  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];

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
            const regex = /http/gi;
            let urlImg = value.thumbnail.path + "." + value.thumbnail.extension;
            if (
              value &&
              value.thumbnail &&
              value.thumbnail.path &&
              value.thumbnail.path.length > 0
            )
              urlImg = urlImg.replace(regex, "https");

            return (
              <StyledLinkButton
                key={index}
                to={`/comic/${value.id}`}
                onClick={() => {
                  dispatch(closeModal());
                }}
              >
                <DetailsCharacter
                  title={value.title}
                  url={urlImg}
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
