import { useState } from "react";
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

export function CharactersPage() {
  const [page, setPage] = useState(1);
  const [charactersList, setCharactersList] =
    useState<CharacterListData | null>(null);

  const { loading, error, data } = useQuery<CharacterListData, ListQueryParams>(
    GET_CHARACTERS_LIST,
    {
      variables: { page: page },
      onCompleted: (characters: CharacterListData) => {
        setCharactersList(characters);
      },
    }
  );
  console.log(data);

  return (
    <ListContainer>
      {loading ? (
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
            items={data!.characters.results}
            colsData={colsData}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
