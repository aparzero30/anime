import {Episode} from "./AnimeInfo";

export interface SaveAnime {
  id:string;
  banner:string;
  poster:string;
  title:string;
  lastEpisode:Episode | undefined;
}
