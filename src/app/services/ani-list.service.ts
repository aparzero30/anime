import { Injectable } from '@angular/core';
import {ANIME, META} from "@consumet/extensions";
import {from, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AniListService {
  private cache = new Map<string, any>();

  constructor() {}

  private setCache(key: string, value: any) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + 60000 // Cache for 60 seconds
    });
  }

  private getCache(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.value;
    } else {
      this.cache.delete(key); // Remove expired cache
      return null;
    }
  }

  getTrending(page: number) {
    const cacheKey = `trending-${page}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return from([cached]);
    }

    const anilist = new META.Anilist();
    return from(anilist.fetchTrendingAnime(page, 30)).pipe(
      map((response: any) => {
        this.setCache(cacheKey, response);
        return response;
      })
    );
  }

  getPopular(page:number) {
    const cacheKey = `popular-${page}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return from([cached]);
    }

    const anilist = new META.Anilist();
    return from(anilist.fetchPopularAnime(page, 30)).pipe(
      map((response: any) => {
        this.setCache(cacheKey, response);
        return response;
      })
    );
  }

  search(key: string,page:number) {
    const cacheKey = `search-${key}-${page}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return from([cached]);
    }

    const anilist = new META.Anilist();
    return from(anilist.search(key, page, 30)).pipe(
      map((response: any) => {
        this.setCache(cacheKey, response);
        return response;
      })
    );
  }

  getByGenres(genres: string[],page:number) {
    const cacheKey = `genres-${genres.join(',')}-${page}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return from([cached]);
    }

    const anilist = new META.Anilist();
    return from(anilist.fetchAnimeGenres(genres, page,30)).pipe(
      map((response: any) => {
        this.setCache(cacheKey, response);
        return response;
      })
    );
  }

  getAnimeInfo(id: string) {
    const cacheKey = `anime-info-${id}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return from([cached]);
    }

    const anilist = new META.Anilist();
    return from(anilist.fetchAnimeInfo(id)).pipe(
      map((response: any) => {
        this.setCache(cacheKey, response);
        return response;
      })
    );
  }

  getEpisodeSources(episodeId: string, episodeNumber: number, animeId: number) {
    // const cacheKey = `episode-sources-${episodeId}-${episodeNumber}-${animeId}`;
    // const cached = this.getCache(cacheKey);
    // if (cached) {
    //   return from([cached]);
    // }

    const anilist = new ANIME.Anify();
    return from(anilist.fetchEpisodeSources(episodeId, episodeNumber, animeId)).pipe(
      map((response: any) => {
        // this.setCache(cacheKey, response);
        return response;
      })
    );
  }
}
