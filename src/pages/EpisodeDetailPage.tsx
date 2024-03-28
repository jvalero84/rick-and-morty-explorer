import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { TItemIdParam } from "../types/apitypes";

export function EpisodeDetailPage() {
  const { id } = useParams<TItemIdParam>();

  return <div>EpisodeDetailPage</div>;
}
