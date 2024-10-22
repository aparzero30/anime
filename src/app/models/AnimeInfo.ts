export interface AnimeInfo {
  id: string;
  artwork: ArtWork[];
  color?:string;
  title: {
    romaji: string;
    english: string;
    native: string | undefined; // Native title can be undefined
    userPreferred: string;
  };
  malId: number;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  cover: string;
  description: string;
  status: string;
  releaseDate: number; // Assuming release date is a year
  nextAiringEpisode: Airing,
  rating: number;
  duration: number; // Duration in minutes
  genres: string[];
  studios: string[];
  subOrDub: string;
  recommendations: Recommendation[];
  episodes: Episode[];
  characters:Character[];
}


export interface ArtWork{
  img:string;
  providerId: string;
  type:string;
}

export interface Airing{
  airingTime: number;
  timeUntilAiring: number;
  episode: number;
}


export interface Recommendation {
  id: number;
  idMal: number;
  title: {
    romaji: string;
    english: string;
    native: string | undefined; // Native title can be undefined
    userPreferred: string | undefined; // User preferred title can be undefined
  };
  status: string;
  episodes: number;
  image: string;
  cover: string;
  score: number;
}

export interface Episode {
  id: string;
  title: string;
  image: string;
  number: number;
  description: string;
  url: string; // URL can be a string
}

export interface Name {
  first: string;
  last: string;
  full: string;
  native: string;
  userPreferred: string;
}

export interface VoiceActor {
  id: number;
  language: string;
  name: Name;
  image: string;
  imageHash: string;
}

export interface Character {
  id: number;
  role: string;
  name: Name;
  image: string;
  imageHash: string;
  voiceActors: VoiceActor[];
}

