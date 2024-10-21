import {Component, Input, OnInit} from '@angular/core';
import {Episode} from "../../models/AnimeInfo";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {AniListService} from "../../services/ani-list.service";
import {MediaDetails, Source} from "../../models/Source";
import {MediaPlayerComponent} from "../media-player/media-player.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-episode-wrapper',
  standalone: true,
  imports: [
    NgForOf,
    MediaPlayerComponent,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './episode-wrapper.component.html',
  styleUrl: './episode-wrapper.component.css'
})
export class EpisodeWrapperComponent implements OnInit{
 @Input() episodes!:Episode[]|undefined;
 @Input() animeId!:string|undefined;
 @Input() color!:string;


 hoveredEpisodeId: string  = "";


 setHoveredId(id:string){
   this.hoveredEpisodeId = id;
 }


  mediaDetails!:MediaDetails;
  sources:Source[] =[]

  selectedEpisodeName = "";
  selectedEpisodeId = "";

  showVideoPlayer = false;

  constructor(private route: ActivatedRoute,
              private aniListService:AniListService,
              private location: Location){
  }

  ngOnInit(): void {


    const routeEpisodeId = this.route.snapshot.paramMap.get("episode-id");
    console.log("RouteId: ",routeEpisodeId)

    console.log(this.episodes)

    if(routeEpisodeId !== undefined && routeEpisodeId !== null){
       this.selectedEpisodeId = routeEpisodeId;

       const episode = this.episodes?.find(ep=>ep.id === this.selectedEpisodeId);

       if(episode){
         this.getEpisodeSources(episode.id,episode.number,episode.title)
       }


       console.log("RouteId: ",routeEpisodeId)
    }


    else{
      if(this.episodes !==undefined){
        const currentEpisode = this.episodes[0];
        this.getEpisodeSources(currentEpisode.id,currentEpisode.number,currentEpisode.title)
      }
    }




  }

  getEpisodeSources(episodeId:string,episodeNumber:number,epName:string){

    this.showVideoPlayer = false;
    this.selectedEpisodeName = epName;
    this.selectedEpisodeId = episodeId;

    this.aniListService.getEpisodeSources(episodeId,episodeNumber,Number(this.animeId)).subscribe({
      next: (v) => {
        this.mediaDetails = v;
        this.sources = this.mediaDetails.sources;
        this.showVideoPlayer = true;

        const newUrl = `/info/${this.animeId}/episode/${this.selectedEpisodeId}`;
        this.location.replaceState(newUrl);
      },
      error: (e) => {
        console.log("Error")
        console.log(e)
      },
      complete: () => console.info('complete'),
    });
  }
}
