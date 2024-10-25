import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SaveAnime} from "../../models/SaveAnime";
import {HistoryUtil} from "../../util/HistoryUtil";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {TrendingCardComponent} from "../trending-card/trending-card.component";
import {LastWatch} from "../../models/LastWatch";

@Component({
  selector: 'app-my-corner',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    TrendingCardComponent
  ],
  templateUrl: './my-corner.component.html',
  styleUrl: './my-corner.component.css'
})
export class MyCornerComponent implements OnInit{


  @ViewChild('myWrapper', { static: false }) wrapperRef!: ElementRef;
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  saveAnimes:SaveAnime[] = [];
  watchedEpisodes:LastWatch[] = [];




  selectedAnime = "SAVED ANIMES"

  animeBanner = "https://s4.anilist.co/file/anilistcdn/media/anime/banner/162804-NwvD3Lya8IZp.jpg";

    ngOnInit(): void {
        this.saveAnimes = HistoryUtil.getAllSavedAnime();
        if(this.saveAnimes.length > 0){
          this.animeBanner = this.saveAnimes[0].banner;
        }
        this.watchedEpisodes = HistoryUtil.getAllLastEpisodes();
    }

  ngAfterViewInit(): void {
      this.fixHeight();
  }
  @HostListener('window:resize')
  onResize() {
      this.fixHeight();
  }

  fixHeight(){
    const cardElements = this.cards.toArray();
    if (cardElements.length > 0) {
      const initialHeight = cardElements[0].nativeElement.offsetHeight;
      const initialWidth = cardElements[0].nativeElement.offsetWidth;

      //const firstCardHeight = initialHeight>30? initialHeight:37;
      const firstCardHeight =  initialWidth+(initialWidth/2)-10;
      console.log(cardElements[0].nativeElement.width)

      cardElements.forEach(card => {
        card.nativeElement.style.height = `${firstCardHeight}px`;
        card.nativeElement.style.minHeight = `${firstCardHeight}px`;
        card.nativeElement.style.maxHeight = `${firstCardHeight}px`;

      });
    }
  }


  setAnimeBanner(banner:string,title:string){
      this.animeBanner = banner;
      this.selectedAnime = title;
    }

  viewAnime(animeId:string){
    window.open('/info/'+animeId, '_blank');
    // this.router.navigate(['/leave-request/'+id]);
  }

  episodeClickHandler(url:string){
    console.log(url);
    window.open(url, '_blank');
  }


}
