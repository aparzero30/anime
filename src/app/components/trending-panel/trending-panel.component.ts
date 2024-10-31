import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageControlComponent} from "../page-control/page-control.component";
import {AniListService} from "../../services/ani-list.service";
import {FetchResult} from "../../models/FetchResult";
import {TrendingCardComponent} from "../trending-card/trending-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {AnimePreview} from "../../models/AnimePreview";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-trending-panel',
  standalone: true,
  imports: [
    PageControlComponent,
    TrendingCardComponent,
    NgForOf,
    NgIf,
    LoadingComponent
  ],
  templateUrl: './trending-panel.component.html',
  styleUrl: './trending-panel.component.css'
})
export class TrendingPanelComponent implements OnInit{

  isLoading = true;

  trendingResult:FetchResult|undefined = undefined;

  @Output() setError: EventEmitter<any> = new EventEmitter();
  @Output() toggleHeader = new EventEmitter();

  nextLoading = false;
  previousLoading = false;


  currentPage = 1;

  constructor(private aniListService:AniListService) {
  }


  ngOnInit(): void {
    this.getTrending()
  }

  hasNextPage = true;

  incrementPage(){
    this.nextLoading = true;
    ++this.currentPage;
    this.getTrending();
  }
  decrementPage(){
    this.previousLoading = true;
    --this.currentPage;
    this.getTrending();
  }



  getTrending(){

  this.toggleHeader.emit();

    this.aniListService.getTrending(this.currentPage).subscribe({
      next: (v) => {
        this.trendingResult = v;
        this.isLoading = false;

        if(this.trendingResult){
          this.hasNextPage = this.trendingResult?.hasNextPage;
        }
        this.previousLoading = false;
        this.nextLoading = false;

      },
      error: (e) => {
        console.log("Error")
        console.log(e)
        this.setError.emit(true);
      },
      complete: () => console.info('complete'),
    });

  }



}
