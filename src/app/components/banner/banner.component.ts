import {Component, Input, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ArtWork} from "../../models/AnimeInfo";
import {DesignUtil} from "../../util/DesignUtil";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{

  @Input() title:string|undefined;
  @Input() artwork:ArtWork[]|undefined;
  @Input() genres:string[]|undefined;
  @Input() description:string|undefined;
  @Input() color:string|undefined;

  posterImage = "";
  bannerImage = "";

  @Input() posterUrl:string|undefined;
  @Input() bannerUrl:string|undefined;



  ngOnInit(): void {

    this.getImages();


  }


  getImages(){

   if(this.artwork !== undefined){
     for (let i = 0; i < this.artwork.length; i++) {

       const art = this.artwork[i];

       if(art.type === "poster" && this.posterImage === ""){
         this.posterImage = art.img;
       }

       if(art.type === "banner" && this.bannerImage === ""){
         this.bannerImage = art.img;
       }

       if(this.bannerImage !== "" && this.posterImage !== ""){
         break;
       }
     }
   }
   else{
      this.bannerImage = this.bannerUrl === undefined ? "" : this.bannerUrl;
      this.posterImage = this.posterUrl === undefined ? "" : this.posterUrl;

   }

  }


  protected readonly DesignUtil = DesignUtil;
}