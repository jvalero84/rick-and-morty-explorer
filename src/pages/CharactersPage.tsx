import { useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import {
  ListContainer,
  ListTitle,
  TitleSection,
  TitleLeftCol,
  TitleRightCol,
} from "../styles/ListView.styles";
import { gql, useQuery } from "@apollo/client";

import {
  CharacterListResult,
  CharacterListData,
  ListQueryParams,
  FilteredCharacterListData,
  FilteredListQueryParams,
  ColData,
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

  console.log("charFilter", charFilter);

  const [charactersList, setCharactersList] =
    useState<CharacterListData | null>(null);

  const { loading, error, data } = useQuery<CharacterListData, ListQueryParams>(
    GET_CHARACTERS_LIST,
    {
      variables: { page: page },
      skip: charFilter != null,
      onCompleted: (characters: CharacterListData) => {
        setCharactersList(characters);
      },
    }
  );
  console.log(data);

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
        console.log("FilteredQuery completed!!");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <ListContainer>
      {loading || loadingFilter ? (
        <TitleSection>
          <TitleLeftCol>
            <Spinner animation="border" variant="primary" />
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
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
