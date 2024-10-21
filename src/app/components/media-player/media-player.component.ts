import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Source} from "../../models/Source";
import Hls from "hls.js";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {VideoDownloadService} from "../../services/video-download.service";

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent {
  @Input() sources!:Source[];
  @Input() episodeName!:string;
  @Input() color!:string;

  downloadLoading   = false;

  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  private hls!: Hls;

  private hlsUrl = 'https://www039.anzeat.pro/streamhls/e8c588712d09a8d9f965bc9dac48ee68/ep.1.1728160179.360.m3u8';

  constructor(private videoDownloadService: VideoDownloadService) {}

  // download() {
  //   this.downloadLoading = true;
  //   this.videoDownloadService.downloadVideo(this.hlsUrl);
  //   this.downloadLoading = false;
  // }

  download() {
    this.downloadLoading = true;
    this.videoDownloadService.downloadVideo(this.hlsUrl)
      .then(() => {
        console.info('Download complete');
      })
      .catch((e) => {
        console.error("Error", e);
      });
    this.downloadLoading = false;
  }





  selectHighestQuality(){
    let index360p =  0;
    let index480p =  0;
    let index720p =  0;
    let index1080p = 0;
    let indexDefault = 0;

    for (let i = 0; i < this.sources.length; i++) {
        const source = this.sources[i];
        if(source.quality ==="360p"){
           index360p =  i;
        }
        else if(source.quality ==="480p"){
          index480p = i;
        }
        else if(source.quality ==="720p"){
          index720p =  i;
        }
        else if(source.quality ==="1080p"){
          index1080p =  i;
        }
        else{
          indexDefault =  i;
        }
    }

    if(index1080p!==0){
      this.hlsUrl = this.sources[index1080p].url;
    }
    else if(index720p!==0){
      this.hlsUrl = this.sources[index720p].url;
    }
    else if(index480p!==0){
      this.hlsUrl = this.sources[index480p].url;
    }
    else if(index360p!==0){
      this.hlsUrl = this.sources[index360p].url;
    }
    else{
      this.hlsUrl = this.sources[indexDefault].url;
    }

    console.log("Selected Url:", this.hlsUrl);

  }



  ngOnInit() {

    this.selectHighestQuality();

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(this.hlsUrl);
      this.hls.attachMedia(this.videoRef.nativeElement);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoRef.nativeElement.play();
      });
    } else if (this.videoRef.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoRef.nativeElement.src = this.hlsUrl;
      this.videoRef.nativeElement.addEventListener('loadedmetadata', () => {
        this.videoRef.nativeElement.play();
      });
    }
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
