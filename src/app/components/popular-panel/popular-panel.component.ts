import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TrendingCardComponent} from "../trending-card/trending-card.component";
import {FetchResult} from "../../models/FetchResult";
import {AniListService} from "../../services/ani-list.service";

@Component({
  selector: 'app-popular-panel',
  standalone: true,
  imports: [
    NgForOf,
    TrendingCardComponent,
    NgIf
  ],
  templateUrl: './popular-panel.component.html',
  styleUrl: './popular-panel.component.css'
})
export class PopularPanelComponent {

  popularResult:FetchResult|undefined = undefined;

  @Output() setError: EventEmitter<any> = new EventEmitter();

  isLoading = true;

  currentPage = 1;
  nextLoading = false;
  previousLoading = false;
  hasNextPage = true;


  incrementPage(){
    this.nextLoading = true;
    this.currentPage++;
    this.getPopular();
  }
  decrementPage(){
    this.previousLoading = true;
    this.currentPage--;
    this.getPopular();
  }




  constructor(private aniListService:AniListService) {
  }


  ngOnInit(): void {
    this.getPopular();
  }
  getPopular(){
    this.aniListService.getPopular(this.currentPage).subscribe({
      next: (v) => {
        this.popularResult = v;
        this.isLoading = false;

        if(this.popularResult){
          this.hasNextPage = this.popularResult?.hasNextPage;
        }
        this.previousLoading = false;
        this.nextLoading = false;

      },
      error: (e) => {
        console.log("Error")
        console.log(e)
        this.setError.emit(true)
      },
      complete: () => console.info('complete'),
    });
  }


}
