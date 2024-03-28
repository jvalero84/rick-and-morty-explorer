import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";

import {
  ListContainer,
  ListTitle,
  TitleSection,
  TitleLeftCol,
  TitleRightCol,
} from "../styles/ListView.styles";

import {
  LocationListResult,
  LocationListData,
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
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Dimension",
    accessor: "dimension",
  },
  {
    Header: "Created",
    accessor: "created",
  },
];

const GET_LOCATIONS_LIST = gql`
  query getLocationsList($page: Int!) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

export function LocationsPage() {
  const [page, setPage] = useState(1);
  //const [charactersList, setCharactersList] =
  //  useState<CharacterListData | null>(null);

  const { loading, error, data } = useQuery<LocationListData, ListQueryParams>(
    GET_LOCATIONS_LIST,
    {
      variables: { page: page },
      //   onCompleted: (characters: CharacterListData) => {
      //     setCharactersList(characters);
      //   },
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
            <ListTitle>LOCATIONS</ListTitle>
          </TitleRightCol>
        </TitleSection>
      ) : (
        <div>
          <TitleSection>
            <TitleLeftCol>&nbsp;</TitleLeftCol>
            <TitleRightCol>
              <ListTitle>LOCATIONS</ListTitle>
            </TitleRightCol>
          </TitleSection>
          <ListComponent
            itemType="locations"
            items={data!.locations.results}
            colsData={colsData}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
