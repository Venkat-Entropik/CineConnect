import { dataProps } from "./data.types";

export interface genreProps {
  id: number | string;
  name: string;
}

export interface sortByProps {
  value: string;
  label: string;
}

export interface ExploreDataProps {
  page: number;
  results: dataProps[];
  total_pages: number;
  total_results: number;
}

export interface selectedSortByActionProps {
  action: string;
  name: string;
  option: string | undefined;
  sort_by: string | undefined;
}

export type crewTypes = {
  adult: boolean;
  credit_id: string | number;
  department: string;
  gender: number | string;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type movieDetailsTypes = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};
