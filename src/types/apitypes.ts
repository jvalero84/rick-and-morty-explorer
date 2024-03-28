export type ListResultsInfo = {
  count: number;
  pages: number;
  next: number;
  prev: number;
};

export type CharacterListResult = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Place;
  location: Place;
};

export type TCharacterDetailWrapper = CharacterListResult & {
  image: string;
  type: string;
  episode: EpisodeKeyData[];
  created: Date;
};

export type TCharacterDetail = {
  character: TCharacterDetailWrapper;
};

export type CharactersData = {
  info: ListResultsInfo;
  results: CharacterListResult[];
};

export type CharacterListData = {
  characters: CharactersData;
};

export type EpisodeListResult = {
  id: number;
  name: string;
  air_date: Date;
  created: Date;
};

export type EpisodesData = {
  info: ListResultsInfo;
  results: EpisodeListResult[];
};

export type EpisodeListData = {
  episodes: EpisodesData;
};

export type FilteredEpisodeListData = {
  episodesByIds: EpisodeListResult[];
};

type EpisodeKeyData = {
  id: string;
  name: string;
};

export type LocationListResult = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  created: Date;
};

export type LocationsData = {
  info: ListResultsInfo;
  results: LocationListResult[];
};

export type LocationListData = {
  locations: LocationsData;
};

type Place = {
  id: string;
  name: string;
  dimension: string;
};

export type ColData = { Header: string; accessor: any };

export interface ListQueryParams {
  page: number;
}

export interface FilteredListQueryParams {
  ids: string[];
}

export type TItemIdParam = {
  id: string;
};
