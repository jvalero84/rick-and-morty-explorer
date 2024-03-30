import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
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
  EpisodeListResult,
  EpisodeListData,
  FilteredEpisodeListData,
  ListQueryParams,
  TItemIdParam,
  FilteredListQueryParams,
} from "../types/apitypes";
import { ListComponent } from "../components/ListComponent";

interface IEpisodesPageProps {
  epIds?: TItemIdParam[];
}

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
    Header: "Air date",
    accessor: "air_date",
  },
  {
    Header: "Created",
    accessor: (d: EpisodeListResult) =>
      formatDate(d.created, "MMMM dd, yyyy p"),
  },
];

const GET_EPISODES_LIST = gql`
  query getEpisodesList($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        created
      }
    }
  }
`;

const GET_EPISODES_LIST_FILTERED = gql`
  query getEpisodesFiltered($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      created
    }
  }
`;

export function EpisodesPage() {
  const [page, setPage] = useState(1);

  let { state } = useLocation();
  let epFilter = state?.epFilter;

  window.history.replaceState({ epFilter }, "");

  const { loading, error, data } = useQuery<EpisodeListData, ListQueryParams>(
    GET_EPISODES_LIST,
    {
      variables: { page: page },
      onCompleted: (episodes: EpisodeListData) => {
        console.log("Episodes Query completed");
        console.log(episodes);
      },
      skip: epFilter != null,
    }
  );

  const {
    data: dataFiltered,
    loading: loadingFilter,
    error: err,
  } = useQuery<FilteredEpisodeListData, FilteredListQueryParams>(
    GET_EPISODES_LIST_FILTERED,
    {
      variables: { ids: epFilter },
      skip: epFilter == null,
      onCompleted: (episodes: FilteredEpisodeListData) => {
        console.log("Episodes FilteredQuery completed");
        console.log(episodes);
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
            <ListTitle>EPISODES</ListTitle>
          </TitleRightCol>
        </TitleSection>
      ) : (
        <div>
          <TitleSection>
            <TitleLeftCol>&nbsp;</TitleLeftCol>
            <TitleRightCol>
              <ListTitle>EPISODES</ListTitle>
            </TitleRightCol>
          </TitleSection>
          <ListComponent
            itemType="episodes"
            items={
              epFilter != null
                ? dataFiltered!.episodesByIds
                : data!.episodes.results
            }
            colsData={colsData}
            page={epFilter != null ? 0 : page}
            nextPage={epFilter == null ? data!.episodes.info.next : null}
            setPage={setPage}
          />
        </div>
      )}
    </ListContainer>
  );
}
