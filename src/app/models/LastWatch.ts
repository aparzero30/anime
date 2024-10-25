import {Episode} from "./AnimeInfo";

export interface LastWatch {
  animeId:string;
  animeTitle:string;
  url:string;
  lastEpisode:Episode;
}
