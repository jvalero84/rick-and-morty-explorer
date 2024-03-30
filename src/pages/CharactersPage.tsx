import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  CustomSpinner,
  ListContainer,
  ListTitle,
  TitleSection,
  TitleLeftCol,
  TitleRightCol,
} from "../styles/ListView.styles";
import { gql, useQuery } from "@apollo/client";

import {
  CharacterListData,
  ListQueryParams,
  FilteredCharacterListData,
  FilteredListQueryParams,
} from "../types/apitypes";
import { ListComponent } from "../components/ListComponent";

const colsData = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Species",
    accessor: "species",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Origin",
    id: "origin",
    accessor: (d: any) => d.origin.name,
  },
  {
    Header: "Location",
    id: "location",
    accessor: (d: any) => d.location.name,
  },
];

const GET_CHARACTERS_LIST = gql`
  query getCharactersList($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
          dimension
        }
        location {
          name
          dimension
        }
      }
    }
  }
`;

const GET_CHARACTERS_LIST_FILTERED = gql`
  query getCharactersFiltered($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
      }
      created
    }
  }
`;

export function CharactersPage() {
  const [page, setPage] = useState(1);

  let { state } = useLocation();
  let charFilter = state?.charFilter;

  window.history.replaceState({ charFilter }, "");

  const { loading, error, data } = useQuery<CharacterListData, ListQueryParams>(
    GET_CHARACTERS_LIST,
    {
      variables: { page: page },
      onCompleted: (characters: CharacterListData) => {
        console.log("Characters Query completed");
        console.log(characters);
      },
      skip: charFilter != null,
    }
  );

  const {
    data: dataFiltered,
    loading: loadingFilter,
    error: err,
  } = useQuery<FilteredCharacterListData, FilteredListQueryParams>(
    GET_CHARACTERS_LIST_FILTERED,
    {
      variables: { ids: charFilter },
      skip: charFilter == null,
      onCompleted: (characters: FilteredCharacterListData) => {
        console.log("Characters FilteredQuery completed");
        console.log(characters);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <ListContainer>
      {error || err ? (
        <div>Error while retrieving data...</div>
      ) : loading || loadingFilter ? (
        <TitleSection>
          <TitleLeftCol>
            <CustomSpinner animation="border" />
          </TitleLeftCol>
          <TitleRightCol>
            <ListTitle>CHARACTERS</ListTitle>
          </TitleRightCol>
        </TitleSection>
      ) : (
        <div>
          <TitleSection>
            <TitleLeftCol>&nbsp;</TitleLeftCol>
            <TitleRightCol>
              <ListTitle>CHARACTERS</ListTitle>
            </TitleRightCol>
          </TitleSection>
          <ListComponent
            itemType="characters"
            items={
              charFilter != null
                ? dataFiltered!.charactersByIds
                : data!.characters.results
            }
            colsData={colsData}
            page={charFilter != null ? 0 : page}
            nextPage={charFilter == null ? data!.characters.info.next : null}
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
