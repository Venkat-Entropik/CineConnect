import { dataProps } from "./data";

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
