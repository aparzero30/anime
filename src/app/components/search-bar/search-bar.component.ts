import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {GenreConstants} from "../../constants/GenreConstants";
import {AniListService} from "../../services/ani-list.service";
import {TrendingCardComponent} from "../trending-card/trending-card.component";
import {FetchResult} from "../../models/FetchResult";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TrendingCardComponent,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  advanceSearchVisible =  false;
  searchResultVisible = false;

  normalSearch = true;

  @Output() setError: EventEmitter<any> = new EventEmitter();


  selectedGenres:string[] = [];

  constructor(private aniListService:AniListService) {
  }

  toggleAdvancedSearch(){
    this.advanceSearchVisible = !this.advanceSearchVisible;
  }

  toggleGenre(genre:string){
    let existing = false;
    for (let i = 0; i < this.selectedGenres.length; i++) {
      if(genre === this.selectedGenres[i]){
        existing = true;
        this.selectedGenres.splice(i, 1);
        break;
      }
    }
    if(!existing){
      this.selectedGenres.push(genre);
    }
  }


  advanceSearchResult!:FetchResult;



  basicSearch(){
    this.currentPage = 1;
    this.search();
  }
  basicGenreSearch(){
    this.currentPage = 1;
    this.advanceSearch();
  }



  advanceSearch(){

    this.normalSearch = false;

    this.aniListService.getByGenres(this.selectedGenres,this.currentPage).subscribe({
      next: (v) => {
        console.log(v)
        this.advanceSearchResult = v;
        this.searchResultVisible = true;
        this.nextLoading =false
        this.previousLoading = false;
        this.hasNextPage = this.advanceSearchResult.hasNextPage
      },
      error: (e) => {
        console.log("Error")
        console.log(e)
        this.setError.emit(true)
      },
      complete: () => console.info('complete'),
    });
  }


  nextLoading = false;
  previousLoading = false;
  isLoading = false;
  currentPage = 1;



  searchKey = "";
  searchLoading = false;

  hasNextPage = true;

  incrementPage(){
    this.nextLoading = true;
    this.currentPage++;

    if(this.normalSearch){
      this.search();
    }else{
      this.advanceSearch();
    }
  }
  decrementPage(){
    this.previousLoading = true;
    this.currentPage--;
    this.search();
  }




  search(){

    this.normalSearch = true;


    this.searchLoading = true;
    this.aniListService.search(this.searchKey,this.currentPage).subscribe({
      next: (v) => {
        console.log(v)
        this.advanceSearchResult = v;
        this.searchResultVisible = true;
        this.searchLoading = false;
        this.nextLoading =false
        this.previousLoading = false;
        this.hasNextPage = this.advanceSearchResult.hasNextPage
      },
      error: (e) => {
        console.log("Error")
        console.log(e)
        this.setError.emit(true)

      },
      complete: () => console.info('complete'),
    });
  }







  protected readonly GenreConstants = GenreConstants;
}
