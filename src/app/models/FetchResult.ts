import {AnimePreview} from "./AnimePreview";

export interface FetchResult {
  currentPage:number;
  hasNextPage:boolean;
  results: AnimePreview[];
}
