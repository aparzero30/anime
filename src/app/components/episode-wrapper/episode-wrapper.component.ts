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
import {HistoryUtil} from "../../util/HistoryUtil";
import {LastWatch} from "../../models/LastWatch";

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

    window.addEventListener('beforeunload', this.setLastEpisode.bind(this)); // Correctly referencing the method


    const routeEpisodeId = this.route.snapshot.paramMap.get("episode-id");
    if(routeEpisodeId !== undefined && routeEpisodeId !== null){
       this.selectedEpisodeId = routeEpisodeId;

       const episode = this.episodes?.find(ep=>ep.id === this.selectedEpisodeId)

       if(this.episodes){
         this.fistEpisodeNumber = this.episodes[0].number;
         this.lastEpisodeNumber = this.episodes[this.episodes.length - 1].number;
       }

       if(episode){
         this.getEpisodeSources(episode)
         this.selectedEpisodeNumber = episode.number;

         this.setSelectedIndex(episode);

       }
    }

    else{
      if(this.episodes !==undefined){
        const currentEpisode = this.episodes[0];
        this.getEpisodeSources(currentEpisode)
      }
    }
    this.countdown();
  }


  setSelectedIndex(episode:Episode){
    const index = this.episodes?.indexOf(episode);
    if(index && index > -1 && this.episodes){
      this.selectedEpisodeIndex = index;
      const ep = this.episodes[index];
      this.selectedEpisodeNumber = ep.number;
      this.selectedEpisodeIndex = index;
      this.selectedEpisodeId = ep.id
      this.selectedEpisodeName = ep.title
    }
  }

  changeToNextEp(){
    this.selectedEpisodeIndex =  ++this.selectedEpisodeIndex;
    if(this.episodes){
      const episode = this.episodes[this.selectedEpisodeIndex];
      this.setSelectedIndex(episode);
      this.getEpisodeSources(episode)
    }
  }
  changeToPrevEp(){
    this.selectedEpisodeIndex =  --this.selectedEpisodeIndex;
    if(this.episodes){
      const episode = this.episodes[this.selectedEpisodeIndex];
      this.setSelectedIndex(episode);
      this.getEpisodeSources(episode)
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
  window.removeEventListener('beforeunload', this.setLastEpisode.bind(this)); // Correctly referencing the method
  this.setLastEpisode();

}

setLastEpisode(){
  if(this.selectedEpisodeIndex && this.animeId && this.episodes){
    const lastWatch:LastWatch={
      animeId: this.animeId,
      lastEpisode: this.episodes[this.selectedEpisodeIndex],
    }
    HistoryUtil.saveLastEpisode(lastWatch)
  }
}




  getEpisodeSources(episode:Episode){

    this.showVideoPlayer = false;
    this.selectedEpisodeName = episode.title;
    this.selectedEpisodeId = episode.id;
    this.selectedEpisodeNumber = episode.number;
    this.setSelectedIndex(episode)

    this.aniListService.getEpisodeSources(this.selectedEpisodeId,this.selectedEpisodeNumber ,Number(this.animeId)).subscribe({
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
