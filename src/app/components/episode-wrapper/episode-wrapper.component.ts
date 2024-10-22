import {Component, Input, OnInit} from '@angular/core';
import {Airing, Episode} from "../../models/AnimeInfo";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {AniListService} from "../../services/ani-list.service";
import {MediaDetails, Source} from "../../models/Source";
import {MediaPlayerComponent} from "../media-player/media-player.component";
import { Location } from '@angular/common';
import {interval, Subscription} from "rxjs";
import {ConfigFormComponent} from "../config-form/config-form.component";

@Component({
  selector: 'app-episode-wrapper',
  standalone: true,
  imports: [
    NgForOf,
    MediaPlayerComponent,
    NgIf,
    NgClass,
    NgStyle,
    ConfigFormComponent
  ],
  templateUrl: './episode-wrapper.component.html',
  styleUrl: './episode-wrapper.component.css'
})
export class EpisodeWrapperComponent implements OnInit{
 @Input() episodes!:Episode[]|undefined;
 @Input() animeId!:string|undefined;
 @Input() color!:string;
 @Input() nextAiring!:Airing|undefined;


 configView = false;


 hoveredEpisodeId: string  = "";


 showConfig(){
   this.configView = true;
 }


 setHoveredId(id:string){
   this.hoveredEpisodeId = id;
 }


  mediaDetails!:MediaDetails;
  sources:Source[] =[]

  selectedEpisodeName = "";
  selectedEpisodeId = "";
  fistEpisodeNumber = 0;
  lastEpisodeNumber = 0;
  selectedEpisodeNumber = 0
  selectedEpisodeIndex = 0;


  showVideoPlayer = false;

  private timerSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private aniListService:AniListService,
              private location: Location){
  }

  ngOnInit(): void {
    const routeEpisodeId = this.route.snapshot.paramMap.get("episode-id");
    if(routeEpisodeId !== undefined && routeEpisodeId !== null){
       this.selectedEpisodeId = routeEpisodeId;

       const episode = this.episodes?.find(ep=>ep.id === this.selectedEpisodeId)

       if(this.episodes){
         this.fistEpisodeNumber = this.episodes[0].number;
         this.lastEpisodeNumber = this.episodes[this.episodes.length - 1].number;
       }

       if(episode){
         this.getEpisodeSources(episode.id,episode.number,episode.title)
         this.selectedEpisodeNumber = episode.number;

         this.setSelectedIndex(episode);

       }
       console.log("RouteId: ",routeEpisodeId)
    }

    else{
      if(this.episodes !==undefined){
        const currentEpisode = this.episodes[0];
        this.getEpisodeSources(currentEpisode.id,currentEpisode.number,currentEpisode.title)
      }
    }
    this.countdown();
  }


  setSelectedIndex(episode:Episode){
    const index = this.episodes?.indexOf(episode);
    if(index && index > -1){
      this.selectedEpisodeIndex = index;
    }
  }

  changeToNextEp(){
    this.selectedEpisodeIndex =  ++this.selectedEpisodeIndex;
    if(this.episodes){
      const episode = this.episodes[this.selectedEpisodeIndex];
      this.getEpisodeSources(episode.id,episode.number,episode.title)
    }
  }
  changeToPrevEp(){
    this.selectedEpisodeIndex =  --this.selectedEpisodeIndex;
    if(this.episodes){
      const episode = this.episodes[this.selectedEpisodeIndex];
      this.getEpisodeSources(episode.id,episode.number,episode.title)
    }
  }


  countdown() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.nextAiring) {
        this.nextAiring.timeUntilAiring--;

        console.log(this.nextAiring.timeUntilAiring);

        if (this.nextAiring.timeUntilAiring < 0) {
          this.timerSubscription.unsubscribe();// Stop when the countdown reaches zero
        }
      }
      else{
        this.timerSubscription.unsubscribe();// Stop when the countdown reaches zero
      }
    });
  }



ngOnDestroy() {
  this.timerSubscription.unsubscribe();
}


  getEpisodeSources(episodeId:string,episodeNumber:number,epName:string){

    this.showVideoPlayer = false;
    this.selectedEpisodeName = epName;
    this.selectedEpisodeId = episodeId;
    this.selectedEpisodeNumber = episodeNumber;

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
