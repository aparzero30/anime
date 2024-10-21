export interface Source {
  url: string;
  quality: string;
}

export interface IntroOutro {
  start: number;
  end: number;
}

export interface MediaDetails {
  sources: Source[];
  subtitles: string[]; // Assuming subtitles is an array of strings
  audio: string[];     // Assuming audio is an array of strings
  intro: IntroOutro;
  outro: IntroOutro;
  headers: Record<string, any>; // Assuming headers can be a dictionary of key-value pairs
}

