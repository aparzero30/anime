import {SaveAnime} from "../models/SaveAnime";
import {LastWatch} from "../models/LastWatch";


export class HistoryUtil{

  static saveAnimeKey = "save-animes";
  static lastEpisodeKey='last-episode';



  static saveLastEpisode(lastWatch:LastWatch){
    let lastWatches: LastWatch[] = [];
    const optionalWatches = localStorage.getItem(this.lastEpisodeKey);
    if (optionalWatches) {
      // Parse the JSON string to an array of EpConfig
      lastWatches = JSON.parse(optionalWatches);
    }
    const index = lastWatches.findIndex(sv => sv.animeId === lastWatch.animeId);
    if (index !== -1) {
      // If it exists, replace the existing episode
      lastWatches[index] = lastWatch;
    } else {
      // If it doesn't exist, push the new episode
      lastWatches.push(lastWatch);
    }
    localStorage.setItem(this.lastEpisodeKey, JSON.stringify(lastWatches));
  }

  static getAllLastEpisodes(): LastWatch[] {
    const optionalArray = localStorage.getItem(this.lastEpisodeKey);
    return optionalArray ? JSON.parse(optionalArray) : [];
  }

  static saveAnime(anime:SaveAnime){
    let saveAnimes: SaveAnime[] = [];
    const optionalSaves = localStorage.getItem(this.saveAnimeKey);
    if (optionalSaves) {
      // Parse the JSON string to an array of EpConfig
      saveAnimes = JSON.parse(optionalSaves);
    }
    const index = saveAnimes.findIndex(sv => sv.id === anime.id);
    if (index !== -1) {
      // If it exists, replace the existing episode
      saveAnimes[index] = anime;
    } else {
      // If it doesn't exist, push the new episode
      saveAnimes.push(anime);
    }
    localStorage.setItem(this.saveAnimeKey, JSON.stringify(saveAnimes));
  }

  static getAllSavedAnime():SaveAnime[]{
    const optionalArray = localStorage.getItem(this.saveAnimeKey);
    return optionalArray ? JSON.parse(optionalArray) : [];
  }

  static remove(animeId:string){
    let saveAnimes: SaveAnime[] = [];
    const optionalSaves = localStorage.getItem(this.saveAnimeKey);
    if (optionalSaves) {
      // Parse the JSON string to an array of EpConfig
      saveAnimes = JSON.parse(optionalSaves);
    }
    const index = saveAnimes.findIndex(sv => sv.id === animeId);
    if (index !== -1) {
      saveAnimes.splice(index, 1);
      localStorage.setItem(this.saveAnimeKey, JSON.stringify(saveAnimes));
    }
  }

  static exist(animeId:string){
    let saveAnimes: SaveAnime[] = [];
    const optionalSaves = localStorage.getItem(this.saveAnimeKey);
    if (optionalSaves) {
      // Parse the JSON string to an array of EpConfig
      saveAnimes = JSON.parse(optionalSaves);
    }
    const index = saveAnimes.findIndex(sv => sv.id === animeId);
    return index !== -1;
  }
}
