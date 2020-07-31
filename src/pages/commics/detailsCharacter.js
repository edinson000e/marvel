import React, { useEffect, useRef, useCallback } from "react";
import {
  CommonDetailsCharacter,
  ContainerLoading,
  ContainerError
} from "../../components/common";

import { useStateComicsValue } from "../../store/comics";

let options = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
export const DetailsCharacter = props => {
  const comic = useStateComicsValue();
  const Ref = useRef();

  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  const initFetch = useCallback(
    id => {
      if (comic) comic.fetchApi(`/v1/public/comics/${id}`);
    },
    [comic]
  );

  const role = () => {
    let role = [];
    if (role.length === 0) {
      var today = new Date(comic.data.results[0].dates[0].date);

      role.push({
        item: "Published",
        name: today.toLocaleDateString("en-US", options)
      });
    }
    comic.data.results[0].creators.items.map((creator, index) => {
      let resultFilter = -1;

      if (role.length > 0) {
        resultFilter = role.findIndex(value => {
          return value.item === creator.role;
        });
      }

      if (role.length === 0 || resultFilter === -1) {
        role.push({
          item: creator.role,
          name: [creator.name]
        });
      } else {
        role[resultFilter].name.push(creator.name);
      }
      return null;
    });

    return role;
  };
  useEffect(() => {
    window.scrollTo(0, Ref);
    if (is_numeric(props.match.params.id)) initFetch(props.match.params.id);
  }, [props.match.params.id]);
  return (
    <div ref={Ref}>
      {comic && comic.isLoading ? (
        <ContainerLoading />
      ) : comic.data.total === 0 ? (
        <ContainerError
          title={
            comic && comic.error
              ? " Sorry! We couldn't find any results."
              : "There was a search error."
          }
          subTitle="Please try again"
        />
      ) : (
        <div>
          {comic.data.results && (
            <CommonDetailsCharacter
              title={comic.data.results[0].title}
              url={
                comic.data.results[0].thumbnail.path +
                "." +
                comic.data.results[0].thumbnail.extension
              }
              subTitle={role()}
              description={comic.data.results[0].description}
              actions={[
                {
                  path: "/",
                  text: comic.data.results[0].title
                }
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};
