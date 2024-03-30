import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { formatDate } from "date-fns";

import {
  CustomSpinner,
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
    accessor: (d: LocationListResult) =>
      formatDate(d.created, "MMMM dd, yyyy p"),
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

  const { loading, error, data } = useQuery<LocationListData, ListQueryParams>(
    GET_LOCATIONS_LIST,
    {
      variables: { page: page },
      onCompleted: (locations: LocationListData) => {
        console.log("Locations Query completed");
        console.log(locations);
      },
    }
  );

  return (
    <ListContainer>
      {error ? (
        <div>Error while retrieving data...</div>
      ) : loading ? (
        <TitleSection>
          <TitleLeftCol>
            <CustomSpinner animation="border" />
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
            nextPage={data!.locations.info.next}
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
