import {EpConfig} from "../models/EpConfig";

export class EpConfigUtil {

  static save(epConfig:EpConfig){
    let epConfigs: EpConfig[] = [];
    const optionalConfigs = localStorage.getItem("ep-configs");
    if (optionalConfigs) {
      // Parse the JSON string to an array of EpConfig
      epConfigs = JSON.parse(optionalConfigs);
    }
    const index = epConfigs.findIndex(episode => episode.episodeId === epConfig.episodeId);
    if (index !== -1) {
      // If it exists, replace the existing episode
      epConfigs[index] = epConfig;
    } else {
      // If it doesn't exist, push the new episode
      epConfigs.push(epConfig);
    }
    localStorage.setItem("ep-configs", JSON.stringify(epConfigs));
  }
  static getTimeStamp(episodeId: string): number {
    let epConfigs: EpConfig[] = [];
    const optionalConfigs = localStorage.getItem("ep-configs");
    if (optionalConfigs) {
      // Parse the JSON string to an array of EpConfig
      epConfigs = JSON.parse(optionalConfigs);
    }
    const index = epConfigs.findIndex(episode => episode.episodeId === episodeId);
    if (index !== -1) {
      return epConfigs[index].timeStamp;
    }
    else{
      return 0;
    }
  }

}
