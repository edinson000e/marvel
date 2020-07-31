import React, { useEffect } from "react";
import {
  ContainerLoading,
  TitleDescription,
  Grid,
  Card
} from "../../components/common";
import { Container } from "../../components/common/Search";
import { reset } from "../../actions/global";
import { openModal } from "../../actions/modal";
import { useStateValue } from "../../store";
import { useStateChactersComicsValue } from "../../store/chactersComics";
import Modal from "../characters/modalDetails";
import { useLocalStorageSearch } from "../../customHook/useLocalStorage";
import { replaceUrl } from "../../functions/validateHttp";
const Search = props => {
  const [{ global }, dispatch] = useStateValue();
  let ParamID = props.match.params.id.toLowerCase();
  let url = `/v1/public/characters?nameStartsWith=${ParamID}`;
  const searchCharactersData = useLocalStorageSearch(
    "searchCharacters",
    url,
    ParamID,
    props.match.url
  );
  const charactersComics = useStateChactersComicsValue();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [url, dispatch]);

  return (
    <Container>
      {global.isFetching ? (
        <ContainerLoading />
      ) : (
        global.success &&
        (searchCharactersData.total === 0 ? (
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
              {searchCharactersData.results.length > 0 &&
                searchCharactersData.results.map((value, index) => {
                  let title = value.name;
                  return (
                    <Card
                      key={index}
                      title={value.name}
                      photo={replaceUrl(
                        value.thumbnail.path + "." + value.thumbnail.extension
                      )}
                      description={value.description}
                      onClick={() => {
                        dispatch(openModal({ title }));

                        charactersComics.fetchApi(
                          `${replaceUrl(
                            value.comics.collectionURI
                          )}?orderBy=focDate`
                        );
                      }}
                    />
                  );
                })}
            </Grid>
            <Modal />
          </>
        ))
      )}
    </Container>
  );
};

export default Search;
