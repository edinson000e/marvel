import React, { useEffect } from "react";
import {
  ContainerLoading,
  TitleDescription,
  Grid,
  Card
} from "../../components/common";
import { Container } from "../../components/common/Search";

import { reset } from "../../actions/global";

import { useHistory } from "react-router-dom";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
import { useLocalStorageSearch } from "../../customHook/useLocalStorage";

const SearchComics = props => {
  const [{ global }, dispatch] = useStateValue();
  const history = useHistory();
  let ParamID = props.match.params.id.toLowerCase();
  let url = `/v1/public/comics?titleStartsWith=${ParamID}`;
  const searchComicsData = useLocalStorageSearch(
    "searchComics",
    url,
    ParamID,
    props.match.url
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [url]);

  return (
    <Container>
      {global.isFetching ? (
        <ContainerLoading />
      ) : (
        global.success &&
        (searchComicsData.total === 0 ? (
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
              {searchComicsData.results.length > 0 &&
                searchComicsData.results.map((value, index) => {
                  let title = value.title;
                  return (
                    <Card
                      key={index}
                      title={title}
                      photo={
                        value.thumbnail.path + "." + value.thumbnail.extension
                      }
                      description={value.description}
                      onClick={() => {
                        history.push(`/comic/${value.id}`);
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

export default SearchComics;
